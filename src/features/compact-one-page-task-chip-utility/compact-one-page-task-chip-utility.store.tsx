/**
 * Shared app-shell store for the Compact One Page Task Chip Utility.
 *
 * Owns the canonical state owned by US-001:
 *   - active surface / active panel (navigation)
 *   - selected record (entity selection)
 *   - task counts (derived snapshot)
 *   - storage status + last error (persistence telemetry)
 *
 * The store is the only writer of `localStorage`. Smoke / debug state is
 * exposed via a small `AppShellBridge` so we never have to render visible
 * diagnostic chrome in the app shell to observe the store.
 */

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
  DEFAULT_COUNTS,
  DEFAULT_PREFERENCES,
  type AppPanel,
  type AppShellBridge,
  type AppShellError,
  type PersistedPreferences,
  type SelectedRecord,
  type StorageStatus,
  type SurfaceId,
  type TaskCounts,
} from './compact-one-page-task-chip-utility.types';
import {
  RepositoryError,
  createCompactRepo,
  createLocalStorageAdapter,
  type CompactRepo,
} from './compact-one-page-task-chip-utility.repo';
import { TEST_BRIDGE_KEY } from '../../test/bridge';

export interface CompactStoreValue {
  activeSurface: SurfaceId;
  activePanel: AppPanel;
  selected: SelectedRecord | null;
  counts: TaskCounts;
  storageStatus: StorageStatus;
  lastError: AppShellError | null;

  setActiveSurface: (surface: SurfaceId) => void;
  setActivePanel: (panel: AppPanel) => void;
  selectRecord: (record: SelectedRecord | null) => void;
  setCounts: (counts: TaskCounts) => void;
  clearCache: () => void;
  exportJSON: () => string;
  reset: () => void;
}

const CompactStoreContext = createContext<CompactStoreValue | null>(null);

export interface CompactStoreProviderProps {
  children: ReactNode;
  /** Override the storage adapter (tests inject an in-memory adapter). */
  repo?: CompactRepo;
}

const ensureRepo = (overrides?: CompactRepo): CompactRepo => {
  if (overrides) return overrides;
  if (typeof globalThis === 'undefined') {
    return createCompactRepo(createLocalStorageAdapter(null));
  }
  const storage = (globalThis as { localStorage?: Storage }).localStorage ?? null;
  return createCompactRepo(createLocalStorageAdapter(storage));
};

const buildError = (err: unknown, source: string): AppShellError => {
  if (err instanceof RepositoryError) {
    return {
      message: err.message,
      recoverable: err.recoverable,
      source,
    };
  }
  if (err instanceof Error) {
    return { message: err.message, recoverable: false, source };
  }
  return { message: 'unknown error', recoverable: false, source };
};

export const CompactOnePageTaskChipUtilityProvider = ({
  children,
  repo,
}: CompactStoreProviderProps) => {
  const liveRepo = useMemo(() => ensureRepo(repo), [repo]);
  const initialErrorRef = useRef<AppShellError | null>(null);

  // Hydrate from storage on first render; failures become recoverable errors.
  const initial = useMemo(() => {
    try {
      const snapshot = liveRepo.load();
      return {
        preferences: snapshot.preferences,
        storageStatus: 'ready' as StorageStatus,
        error: null as AppShellError | null,
      };
    } catch (err) {
      return {
        preferences: DEFAULT_PREFERENCES,
        storageStatus: 'corrupted' as StorageStatus,
        error: buildError(err, 'bootstrap'),
      };
    }
  }, [liveRepo]);

  initialErrorRef.current = initial.error;

  const [activeSurface, setActiveSurfaceState] = useState<SurfaceId>(
    initial.preferences.activeSurface,
  );
  const [activePanel, setActivePanelState] = useState<AppPanel>(
    initial.preferences.activePanel,
  );
  const [selected, setSelected] = useState<SelectedRecord | null>(
    initial.preferences.selected,
  );
  const [counts, setCountsState] = useState<TaskCounts>(
    initial.preferences.counts ?? DEFAULT_COUNTS,
  );
  const [storageStatus, setStorageStatus] = useState<StorageStatus>(
    initial.storageStatus,
  );
  const [lastError, setLastError] = useState<AppShellError | null>(
    initial.error,
  );

  // Persist preferences whenever any user-visible slice changes. Failures
  // degrade to `corrupted` storage status with a recoverable AppShellError.
  useEffect(() => {
    const preferences: PersistedPreferences = {
      activeSurface,
      activePanel,
      selected,
      counts,
    };
    try {
      liveRepo.savePreferences(preferences);
      setStorageStatus((current) => (current === 'corrupted' ? 'ready' : current));
      setLastError((current) =>
        current && current.source === 'persist' ? null : current,
      );
    } catch (err) {
      setStorageStatus('corrupted');
      setLastError(buildError(err, 'persist'));
    }
  }, [activeSurface, activePanel, selected, counts, liveRepo]);

  const setActiveSurface = useCallback((surface: SurfaceId) => {
    setActiveSurfaceState(surface);
  }, []);

  const setActivePanel = useCallback((panel: AppPanel) => {
    setActivePanelState(panel);
  }, []);

  const selectRecord = useCallback((record: SelectedRecord | null) => {
    setSelected(record);
  }, []);

  const setCounts = useCallback((next: TaskCounts) => {
    setCountsState(next);
  }, []);

  const clearCache = useCallback(() => {
    try {
      liveRepo.clear();
      setActiveSurfaceState(DEFAULT_PREFERENCES.activeSurface);
      setActivePanelState(DEFAULT_PREFERENCES.activePanel);
      setSelected(null);
      setCountsState(DEFAULT_COUNTS);
      setStorageStatus('ready');
      setLastError(null);
    } catch (err) {
      setStorageStatus('unavailable');
      setLastError(buildError(err, 'clearCache'));
    }
  }, [liveRepo]);

  const exportJSON = useCallback(() => {
    const payload: PersistedPreferences = {
      activeSurface,
      activePanel,
      selected,
      counts,
    };
    return JSON.stringify(payload, null, 2);
  }, [activeSurface, activePanel, selected, counts]);

  const reset = useCallback(() => {
    setActiveSurfaceState(DEFAULT_PREFERENCES.activeSurface);
    setActivePanelState(DEFAULT_PREFERENCES.activePanel);
    setSelected(null);
    setCountsState(DEFAULT_COUNTS);
  }, []);

  const value: CompactStoreValue = {
    activeSurface,
    activePanel,
    selected,
    counts,
    storageStatus,
    lastError,
    setActiveSurface,
    setActivePanel,
    selectRecord,
    setCounts,
    clearCache,
    exportJSON,
    reset,
  };

  // Expose a test/debug bridge for the production app shell. This stays in
  // window.app / globalThis.app only — never as visible chrome on the screen.
  useEffect(() => {
    if (typeof globalThis === 'undefined') return;
    const bridge: AppShellBridge = {
      getActiveSurface: () => activeSurface,
      setActiveSurface: (surface) => setActiveSurface(surface),
      getActivePanel: () => activePanel,
      setActivePanel: (panel) => setActivePanel(panel),
      getSelected: () => selected,
      selectRecord: (record) => selectRecord(record),
      getCounts: () => counts,
      setCounts: (next) => setCounts(next),
      getStorageStatus: () => storageStatus,
      getLastError: () => lastError,
      clearCache: () => clearCache(),
      exportJSON: () => exportJSON(),
      reset: () => reset(),
    };
    (globalThis as unknown as Record<string, unknown>).app = bridge;
    (globalThis as unknown as Record<string, unknown>)[TEST_BRIDGE_KEY] = bridge;
    return () => {
      delete (globalThis as unknown as Record<string, unknown>).app;
      delete (globalThis as unknown as Record<string, unknown>)[TEST_BRIDGE_KEY];
    };
  }, [
    activeSurface,
    activePanel,
    selected,
    counts,
    storageStatus,
    lastError,
    setActiveSurface,
    setActivePanel,
    selectRecord,
    setCounts,
    clearCache,
    exportJSON,
    reset,
  ]);

  return (
    <CompactStoreContext.Provider value={value}>
      {children}
    </CompactStoreContext.Provider>
  );
};

export const useCompactOnePageTaskChipUtility = (): CompactStoreValue => {
  const ctx = useContext(CompactStoreContext);
  if (!ctx) {
    throw new Error(
      'useCompactOnePageTaskChipUtility must be used inside CompactOnePageTaskChipUtilityProvider',
    );
  }
  return ctx;
};
