/**
 * Type contracts owned by US-001.
 *
 * These describe the shared app-shell state (active surface, panel, storage
 * status, last error, item counts, selected record) plus persistence payloads
 * for the Compact One Page Task Chip Utility. They are deliberately framework
 * agnostic so they can be shared by the store, the repo, the fixture and the
 * generated Stitch screens via their props.
 */

/** Identifier of a generated full-screen surface mounted in the app shell. */
export type SurfaceId =
  | 'SURF_RECORD_OPERATIONS'
  | 'SURF_RECORD_EDITOR'
  | 'SURF_EMPTY_AND_ERROR_RECOVERY';

/** Logical side panel rendered within the current surface (list/editor/filter…). */
export type AppPanel = 'list' | 'editor' | 'detail' | 'filter' | 'settings';

/** Lifecycle of the local persistence adapter (initialising, ready, error…). */
export type StorageStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'corrupted'
  | 'unavailable';

/** User-facing error envelope surfaced through the app shell. */
export interface AppShellError {
  message: string;
  recoverable: boolean;
  source?: string;
}

/** Stable counts rendered alongside generated full-screen surfaces. */
export interface TaskCounts {
  total: number;
  active: number;
  pending: number;
  done: number;
}

/** Currently selected record (record-id plus a human-readable label). */
export interface SelectedRecord {
  id: string;
  title: string;
}

/** Persisted preferences payload (active surface, panel, counts). */
export interface PersistedPreferences {
  activeSurface: SurfaceId;
  activePanel: AppPanel;
  selected: SelectedRecord | null;
  counts: TaskCounts;
}

/** Persisted records payload (the user-owned task list). */
export interface PersistedRecords {
  records: ReadonlyArray<{
    id: string;
    title: string;
    status: 'active' | 'pending' | 'done';
  }>;
}

/** Full storage snapshot returned by the repo on load. */
export interface StorageSnapshot {
  preferences: PersistedPreferences;
  records: PersistedRecords;
}

/** Public surface/action registry exposed for tests via window.app. */
export interface AppShellBridge {
  getActiveSurface(): SurfaceId;
  setActiveSurface(surface: SurfaceId): void;
  getActivePanel(): AppPanel;
  setActivePanel(panel: AppPanel): void;
  getSelected(): SelectedRecord | null;
  selectRecord(record: SelectedRecord | null): void;
  getCounts(): TaskCounts;
  setCounts(counts: TaskCounts): void;
  getStorageStatus(): StorageStatus;
  getLastError(): AppShellError | null;
  clearCache(): void;
  exportJSON(): string;
  reset(): void;
}

/** Default initial state used by the store and the repo. */
export const DEFAULT_COUNTS: TaskCounts = {
  total: 0,
  active: 0,
  pending: 0,
  done: 0,
};

export const DEFAULT_PREFERENCES: PersistedPreferences = {
  activeSurface: 'SURF_RECORD_OPERATIONS',
  activePanel: 'list',
  selected: null,
  counts: DEFAULT_COUNTS,
};

export const DEFAULT_RECORDS: PersistedRecords = {
  records: [],
};

/** Local storage keys — kept central so the repo and the store stay aligned. */
export const STORAGE_KEY_PREFERENCES = 'compactOnePageTaskChipUtility/preferences/v1';
export const STORAGE_KEY_RECORDS = 'compactOnePageTaskChipUtility/records/v1';
