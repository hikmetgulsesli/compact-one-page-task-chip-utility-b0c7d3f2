/**
 * Test fixtures for the Compact One Page Task Chip Utility.
 *
 * These stay tiny and deterministic — the store / repo tests only need a known
 * starting state plus a fake storage adapter so they can run in jsdom without
 * touching the real `localStorage`.
 */

import {
  DEFAULT_COUNTS,
  DEFAULT_PREFERENCES,
  DEFAULT_RECORDS,
  type PersistedPreferences,
  type PersistedRecords,
  type StorageSnapshot,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';
import type {
  CompactRepo,
  StorageAdapter,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.repo';

/** In-memory storage adapter that mimics the localStorage API. */
export const createMemoryStorageAdapter = (
  initial: Record<string, string> = {},
): StorageAdapter & { snapshot: () => Record<string, string> } => {
  const store = new Map<string, string>(Object.entries(initial));
  return {
    read: (key) => (store.has(key) ? (store.get(key) as string) : null),
    write: (key, value) => {
      store.set(key, value);
    },
    remove: (key) => {
      store.delete(key);
    },
    snapshot: () => Object.fromEntries(store.entries()),
  };
};

export const createInMemoryRepo = (
  initial: Record<string, string> = {},
): CompactRepo => {
  const adapter = createMemoryStorageAdapter(initial);
  // Mirror the real repo API 1:1 but reuse the in-memory adapter as backend.
  return {
    load: () => {
      const preferencesRaw = adapter.read(
        'compactOnePageTaskChipUtility/preferences/v1',
      );
      const recordsRaw = adapter.read(
        'compactOnePageTaskChipUtility/records/v1',
      );
      return {
        preferences:
          preferencesRaw === null
            ? DEFAULT_PREFERENCES
            : (JSON.parse(preferencesRaw) as PersistedPreferences),
        records:
          recordsRaw === null
            ? DEFAULT_RECORDS
            : (JSON.parse(recordsRaw) as PersistedRecords),
      } satisfies StorageSnapshot;
    },
    savePreferences: (preferences) => {
      adapter.write(
        'compactOnePageTaskChipUtility/preferences/v1',
        JSON.stringify(preferences),
      );
    },
    saveRecords: (records) => {
      adapter.write(
        'compactOnePageTaskChipUtility/records/v1',
        JSON.stringify(records),
      );
    },
    clear: () => {
      adapter.remove('compactOnePageTaskChipUtility/preferences/v1');
      adapter.remove('compactOnePageTaskChipUtility/records/v1');
    },
  };
};

/** Standard preference shape used by the store / bridge tests. */
export const samplePreferences: PersistedPreferences = {
  activeSurface: 'SURF_RECORD_OPERATIONS',
  activePanel: 'list',
  selected: { id: 'task-1', title: 'Sample task' },
  counts: { total: 1, active: 1, pending: 0, done: 0 },
};

export const sampleRecords: PersistedRecords = {
  records: [{ id: 'task-1', title: 'Sample task', status: 'active' }],
};

export const emptyCounts = DEFAULT_COUNTS;
