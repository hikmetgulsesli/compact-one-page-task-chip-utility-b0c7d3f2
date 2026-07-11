import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  DEFAULT_PREFERENCES,
  SAMPLE_RECORDS,
  deriveCounts,
} from '../../__fixtures__/compact-one-page-task-chip-utility.fixture';

import {
  createCompactRepo,
  type CompactRepo,
} from './compact-one-page-task-chip-utility.repo';
import type {
  AppError,
  AppPanel,
  AppState,
  AppSurface,
  Preferences,
  RecordStatus,
  StorageStatus,
  StoreActions,
  StoreContextValue,
  TaskCounts,
  TaskRecord,
} from './compact-one-page-task-chip-utility.types';

/**
 * Application store for the Compact One Page Task Chip Utility.
 *
 * The store owns the shared shell state (active surface, active panel,
 * selected record, record list, storage status, last error) and exposes the
 * stable navigation/action handlers sibling screen-owner stories wire into
 * their props.
 *
 * Design rules enforced here (PR review threads):
 *  - `records` and `selectedRecordId` are the only sources of truth. `counts`
 *    and `selectedRecord` are derived with `useMemo` to avoid state
 *    synchronization bugs and side effects inside reducer-style updaters
 *    (PRRT_kwDOTVhfoc6QIVQw).
 *  - Hydration treats any load failure (`loadPreferences` or `loadRecords`)
 *    as a recoverable error. The persistence write effect stays suppressed
 *    until the corrupted payload has been reported (PRRT_kwDOTVhfoc6QIVQr).
 *  - `localStorage` write errors propagate through the adapter so the
 *    persistence effect can mark the storage as corrupted (handled by the
 *    repo's `setItem` rethrowing).
 */

interface ProviderProps {
  children: ReactNode;
  repo?: CompactRepo;
  initialPreferences?: Preferences;
  initialRecords?: ReadonlyArray<TaskRecord>;
}

interface HydrationResult {
  preferences: Preferences | null;
  records: TaskRecord[] | null;
  corrupted: boolean;
  error: AppError | null;
}

function nowMillis(): number {
  return Date.now();
}

function findRecord(
  records: ReadonlyArray<TaskRecord>,
  id: string | null,
): TaskRecord | null {
  if (!id) return null;
  return records.find((record) => record.id === id) ?? null;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export interface CompactOnePageTaskChipUtilityProviderProps extends ProviderProps {}

export function CompactOnePageTaskChipUtilityProvider({
  children,
  repo,
  initialPreferences,
  initialRecords,
}: CompactOnePageTaskChipUtilityProviderProps) {
  const fallbackRepo = useMemo(() => repo ?? createCompactRepo(), [repo]);
  const initialRecordsArray = useMemo<ReadonlyArray<TaskRecord>>(
    () => initialRecords ?? SAMPLE_RECORDS,
    [initialRecords],
  );
  const initialPreferencesValue = useMemo<Preferences>(
    () => initialPreferences ?? DEFAULT_PREFERENCES,
    [initialPreferences],
  );

  const [activeSurface, setActiveSurface] = useState<AppSurface>(
    initialPreferencesValue.activeSurface,
  );
  const [activePanel, setActivePanel] = useState<AppPanel>(
    initialPreferencesValue.activePanel,
  );
  const [records, setRecords] = useState<ReadonlyArray<TaskRecord>>(
    initialRecordsArray,
  );
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(
    initialPreferencesValue.selectedRecordId,
  );
  const [storageStatus, setStorageStatus] = useState<StorageStatus>('idle');
  const [lastError, setLastError] = useState<AppError | null>(null);

  // Track whether the first persistence cycle has completed. We do NOT want
  // the persistence effect to overwrite a corrupted blob before the user has
  // seen the recovery surface, so writes are skipped until hydration either
  // succeeded or the user acted on a corrupted-state notification.
  const hasHydratedRef = useRef(false);

  // Hydrate from the persistence layer once on mount. Both loaders must
  // succeed for the hydration to be considered clean; any failure marks the
  // storage as corrupted and prevents the persistence effect from running.
  useEffect(() => {
    let cancelled = false;
    setStorageStatus('loading');

    const hydration: HydrationResult = (() => {
      let preferences: Preferences | null = null;
      let recordsLoaded: TaskRecord[] | null = null;
      let corrupted = false;
      let error: AppError | null = null;
      const recordLoadErrors: AppError[] = [];

      try {
        preferences = fallbackRepo.loadPreferences();
      } catch (err) {
        corrupted = true;
        error = {
          source: 'load',
          message: err instanceof Error ? err.message : 'Failed to read preferences.',
          recoverable: true,
          observedAt: nowMillis(),
        };
      }

      try {
        recordsLoaded = fallbackRepo.loadRecords();
      } catch (err) {
        // Always surface a records-load failure regardless of whether
        // preferences loaded. Silently dropping this error would let the
        // app boot with sample records, mark hydration as complete, and
        // overwrite the corrupted blob on the next save.
        corrupted = true;
        recordLoadErrors.push({
          source: 'load',
          message: err instanceof Error ? err.message : 'Failed to read records.',
          recoverable: true,
          observedAt: nowMillis(),
        });
      }

      if (recordLoadErrors.length > 0 && error === null) {
        error = recordLoadErrors[0];
      }

      return { preferences, records: recordsLoaded, corrupted, error };
    })();

    if (cancelled) return undefined;

    setStorageStatus(hydration.corrupted ? 'corrupted' : 'ready');
    setLastError(hydration.error);

    if (!hydration.corrupted) {
      if (hydration.preferences) {
        setActiveSurface(hydration.preferences.activeSurface);
        setActivePanel(hydration.preferences.activePanel);
        setSelectedRecordId(hydration.preferences.selectedRecordId);
      }
      if (hydration.records) {
        setRecords(hydration.records);
      }
      hasHydratedRef.current = true;
    }

    return () => {
      cancelled = true;
    };
    // We deliberately key only on the repo identity; records is read inside the
    // effect through the closure and we want a single hydration pass per repo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fallbackRepo]);

  // Derive counts and the resolved selected record from the canonical state.
  // This guarantees they stay in sync with `records` / `selectedRecordId`
  // without any side effects inside updater functions.
  const counts: TaskCounts = useMemo(() => deriveCounts(records), [records]);
  const selectedRecord: TaskRecord | null = useMemo(
    () => findRecord(records, selectedRecordId),
    [records, selectedRecordId],
  );

  // Persist current preferences/records after each mutation. Skipped on the
  // very first render and whenever hydration reported a corrupted blob, so we
  // never overwrite the broken payload before the user has had a chance to
  // recover.
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    setStorageStatus('persisting');
    const preferences: Preferences = {
      activeSurface,
      activePanel,
      selectedRecordId,
      counts,
    };
    try {
      fallbackRepo.savePreferences(preferences);
      fallbackRepo.saveRecords([...records]);
      setStorageStatus('ready');
      setLastError((current) =>
        current && current.source === 'persist' ? null : current,
      );
    } catch (err) {
      setStorageStatus('corrupted');
      setLastError({
        source: 'persist',
        message: err instanceof Error ? err.message : 'Failed to persist state.',
        recoverable: true,
        observedAt: nowMillis(),
      });
    }
  }, [
    fallbackRepo,
    activeSurface,
    activePanel,
    selectedRecordId,
    counts,
    records,
  ]);

  const goToSurface = useCallback((surface: AppSurface) => {
    setActiveSurface(surface);
  }, []);

  const goToPanel = useCallback((panel: AppPanel) => {
    setActivePanel(panel);
  }, []);

  const selectRecord = useCallback((record: TaskRecord | null) => {
    setSelectedRecordId(record ? record.id : null);
  }, []);

  const updateRecordStatus = useCallback(
    (recordId: string, status: RecordStatus) => {
      setRecords((current) => {
        let changed = false;
        const next = current.map((record) => {
          if (record.id !== recordId || record.status === status) {
            return record;
          }
          changed = true;
          return { ...record, status, updatedAt: nowMillis() };
        });
        return changed ? next : current;
      });
    },
    [],
  );

  const clearCache = useCallback(() => {
    try {
      fallbackRepo.clearAll();
    } catch {
      // Clearing the cache is best-effort; the in-memory reset that follows
      // is what the user actually experiences.
    }
    setActiveSurface(DEFAULT_PREFERENCES.activeSurface);
    setActivePanel(DEFAULT_PREFERENCES.activePanel);
    setSelectedRecordId(null);
    setRecords(SAMPLE_RECORDS);
    setStorageStatus('ready');
    setLastError(null);
    hasHydratedRef.current = true;
  }, [fallbackRepo]);

  const exportJSON = useCallback((): string => {
    return JSON.stringify({
      preferences: {
        activeSurface,
        activePanel,
        selectedRecordId,
        counts,
      },
      records,
    });
  }, [activeSurface, activePanel, selectedRecordId, counts, records]);

  const state: AppState = useMemo(
    () => ({
      activeSurface,
      activePanel,
      selectedRecordId,
      selectedRecord,
      records,
      counts,
      storageStatus,
      lastError,
    }),
    [
      activeSurface,
      activePanel,
      selectedRecordId,
      selectedRecord,
      records,
      counts,
      storageStatus,
      lastError,
    ],
  );

  const actions: StoreActions = useMemo(
    () => ({
      goToSurface,
      goToPanel,
      selectRecord,
      updateRecordStatus,
      clearCache,
      exportJSON,
    }),
    [goToSurface, goToPanel, selectRecord, updateRecordStatus, clearCache, exportJSON],
  );

  const value = useMemo<StoreContextValue>(
    () => ({ ...state, ...actions }),
    [state, actions],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useCompactOnePageTaskChipUtility(): StoreContextValue {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error(
      'useCompactOnePageTaskChipUtility must be used inside a CompactOnePageTaskChipUtilityProvider.',
    );
  }
  return value;
}
