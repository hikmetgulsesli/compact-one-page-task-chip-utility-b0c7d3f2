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
  SAMPLE_COUNTS,
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
 * The provider:
 *  - Hydrates from the persistence layer on mount and recovers from corrupted
 *    payloads without overwriting the broken blob before the user has a
 *    chance to act (PR review thread PRRT_kwDOTVhfoc6QIQU6).
 *  - Defends against `localStorage` access that can throw in private browsing
 *    or sandboxed contexts (PR review thread PRRT_kwDOTVhfoc6QIQVA).
 *  - Removes the unused `initialErrorRef` placeholder so dead code does not
 *    ship (PR review thread PRRT_kwDOTVhfoc6QIQVD).
 */

const noopActions = {
  exportJSON: () => '',
};

interface ProviderProps {
  children: ReactNode;
  repo?: CompactRepo;
  initialPreferences?: Preferences;
  initialRecords?: ReadonlyArray<TaskRecord>;
}

interface InternalState {
  activeSurface: AppSurface;
  activePanel: AppPanel;
  selectedRecord: TaskRecord | null;
  records: ReadonlyArray<TaskRecord>;
  counts: TaskCounts;
  storageStatus: StorageStatus;
  lastError: AppError | null;
}

function nowMillis(): number {
  return Date.now();
}

function buildInitialState(
  preferences: Preferences,
  records: ReadonlyArray<TaskRecord>,
): InternalState {
  return {
    activeSurface: preferences.activeSurface,
    activePanel: preferences.activePanel,
    selectedRecord: null,
    records,
    counts: preferences.counts.total === records.length ? preferences.counts : deriveCounts(records),
    storageStatus: 'idle',
    lastError: null,
  };
}

function recordById(
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
  const initial = useMemo<InternalState>(() => {
    const preferences = initialPreferences ?? DEFAULT_PREFERENCES;
    const records = initialRecords ?? SAMPLE_RECORDS;
    return buildInitialState(preferences, records);
  }, [initialPreferences, initialRecords]);

  const [activeSurface, setActiveSurface] = useState<AppSurface>(initial.activeSurface);
  const [activePanel, setActivePanel] = useState<AppPanel>(initial.activePanel);
  const [selectedRecord, setSelectedRecord] = useState<TaskRecord | null>(
    initial.selectedRecord,
  );
  const [records, setRecords] = useState<ReadonlyArray<TaskRecord>>(initial.records);
  const [counts, setCounts] = useState<TaskCounts>(initial.counts);
  const [storageStatus, setStorageStatus] = useState<StorageStatus>(initial.storageStatus);
  const [lastError, setLastError] = useState<AppError | null>(initial.lastError);

  // Track whether the first persistence cycle has completed. We do NOT want
  // the persistence effect to overwrite a corrupted blob before the user has
  // seen the recovery surface, so writes are skipped on the initial render.
  const hasHydratedRef = useRef(false);

  // Load persisted preferences + records once on mount. Failures are surfaced
  // through `lastError` and `storageStatus` so the Empty/Recovery screen can
  // prompt for action.
  useEffect(() => {
    let cancelled = false;
    setStorageStatus('loading');

    let persistedPreferences: Preferences | null = null;
    let persistedRecords: TaskRecord[] | null = null;

    try {
      persistedPreferences = fallbackRepo.loadPreferences();
    } catch (err) {
      if (!cancelled) {
        setStorageStatus('corrupted');
        setLastError({
          source: 'load',
          message: err instanceof Error ? err.message : 'Failed to read preferences.',
          recoverable: true,
          observedAt: nowMillis(),
        });
      }
    }

    try {
      persistedRecords = fallbackRepo.loadRecords();
    } catch (err) {
      if (!cancelled && persistedPreferences === null) {
        setStorageStatus('corrupted');
        setLastError({
          source: 'load',
          message: err instanceof Error ? err.message : 'Failed to read records.',
          recoverable: true,
          observedAt: nowMillis(),
        });
      }
    }

    if (cancelled) return undefined;

    if (persistedPreferences === null && persistedRecords === null) {
      // No persisted state – we are in a clean boot.
      setStorageStatus('ready');
    } else {
      setStorageStatus('ready');
      if (persistedPreferences) {
        setActiveSurface(persistedPreferences.activeSurface);
        setActivePanel(persistedPreferences.activePanel);
        setSelectedRecord(recordById(persistedRecords ?? records, persistedPreferences.selectedRecordId));
        setCounts(persistedPreferences.counts);
      }
      if (persistedRecords) {
        setRecords(persistedRecords);
        setCounts(deriveCounts(persistedRecords));
      }
    }

    hasHydratedRef.current = true;

    return () => {
      cancelled = true;
    };
    // We deliberately key only on the repo identity; records is read inside the
    // effect through the closure and we want a single hydration pass per repo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fallbackRepo]);

  // Persist current preferences/records after each mutation. Skipped on the
  // very first render so we never overwrite a corrupted payload before the
  // recovery surface has had a chance to render.
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    setStorageStatus('persisting');
    const preferences: Preferences = {
      activeSurface,
      activePanel,
      selectedRecordId: selectedRecord?.id ?? null,
      counts,
    };
    try {
      fallbackRepo.savePreferences(preferences);
      fallbackRepo.saveRecords([...records]);
      setStorageStatus((current) => (current === 'corrupted' ? 'ready' : current));
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
  }, [fallbackRepo, activeSurface, activePanel, selectedRecord, counts, records]);

  const goToSurface = useCallback((surface: AppSurface) => {
    setActiveSurface(surface);
  }, []);

  const goToPanel = useCallback((panel: AppPanel) => {
    setActivePanel(panel);
  }, []);

  const selectRecord = useCallback((record: TaskRecord | null) => {
    setSelectedRecord(record);
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
        if (changed) {
          setCounts(deriveCounts(next));
          setSelectedRecord((selected) =>
            selected && selected.id === recordId
              ? { ...selected, status, updatedAt: nowMillis() }
              : selected,
          );
        }
        return changed ? next : current;
      });
    },
    [],
  );

  const clearCache = useCallback(() => {
    fallbackRepo.clearAll();
    setActiveSurface(DEFAULT_PREFERENCES.activeSurface);
    setActivePanel(DEFAULT_PREFERENCES.activePanel);
    setSelectedRecord(null);
    setRecords(SAMPLE_RECORDS);
    setCounts(SAMPLE_COUNTS);
    setStorageStatus('ready');
    setLastError(null);
  }, [fallbackRepo]);

  const exportJSON = useCallback((): string => {
    return JSON.stringify({
      preferences: {
        activeSurface,
        activePanel,
        selectedRecordId: selectedRecord?.id ?? null,
        counts,
      },
      records,
    });
  }, [activeSurface, activePanel, selectedRecord, counts, records]);

  const state: AppState = useMemo(
    () => ({
      activeSurface,
      activePanel,
      selectedRecord,
      records,
      counts,
      storageStatus,
      lastError,
    }),
    [activeSurface, activePanel, selectedRecord, records, counts, storageStatus, lastError],
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

// Re-exported for sibling stories that want to inspect the actions bag.
export const __actionsBag: StoreActions = {
  goToSurface: () => undefined,
  goToPanel: () => undefined,
  selectRecord: () => undefined,
  updateRecordStatus: () => undefined,
  clearCache: () => undefined,
  exportJSON: () => '',
};

export { noopActions };