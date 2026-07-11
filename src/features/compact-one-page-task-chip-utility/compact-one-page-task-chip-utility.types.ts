/**
 * Shared type contracts for the Compact One Page Task Chip Utility.
 *
 * This file is the single source of truth for app surface identifiers, panels,
 * record shapes, persistence status, and the cross-store state that sibling
 * screen-owner stories observe through the bridge.
 */

export type AppSurface =
  | 'SURF_RECORD_OPERATIONS'
  | 'SURF_RECORD_EDITOR'
  | 'SURF_EMPTY_AND_ERROR_RECOVERY';

export type AppPanel = 'list' | 'editor' | 'detail' | 'filter' | 'settings';

export type RecordStatus = 'active' | 'pending' | 'done';

export type StorageStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'persisting'
  | 'corrupted'
  | 'unavailable';

export type ErrorSource = 'load' | 'persist' | 'runtime';

export interface AppError {
  source: ErrorSource;
  message: string;
  recoverable: boolean;
  observedAt: number;
}

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  status: RecordStatus;
  tags: ReadonlyArray<string>;
  archived: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface TaskCounts {
  total: number;
  active: number;
  pending: number;
  done: number;
  archived: number;
}

export interface Preferences {
  activeSurface: AppSurface;
  activePanel: AppPanel;
  selectedRecordId: string | null;
  counts: TaskCounts;
}

export interface PersistedRecords {
  records: TaskRecord[];
}

export interface PersistedState {
  preferences: Preferences;
  records: TaskRecord[];
}

export interface AppState {
  activeSurface: AppSurface;
  activePanel: AppPanel;
  selectedRecordId: string | null;
  selectedRecord: TaskRecord | null;
  records: ReadonlyArray<TaskRecord>;
  counts: TaskCounts;
  storageStatus: StorageStatus;
  lastError: AppError | null;
}

export interface StoreActions {
  goToSurface(surface: AppSurface): void;
  goToPanel(panel: AppPanel): void;
  selectRecord(record: TaskRecord | null): void;
  updateRecordStatus(recordId: string, status: RecordStatus): void;
  clearCache(): void;
  exportJSON(): string;
}

export type StoreContextValue = AppState & StoreActions;