/**
 * Local persistence adapter for the Compact One Page Task Chip Utility.
 *
 * Wraps `localStorage` so the store can stay framework agnostic. The repo is
 * intentionally synchronous (JSON read/write) and surfaces a structured
 * `RepositoryError` for corrupted persisted data — the store translates that
 * into a recoverable user-facing error.
 */

import {
  DEFAULT_PREFERENCES,
  DEFAULT_RECORDS,
  STORAGE_KEY_PREFERENCES,
  STORAGE_KEY_RECORDS,
  type PersistedPreferences,
  type PersistedRecords,
  type StorageSnapshot,
} from './compact-one-page-task-chip-utility.types';

export class RepositoryError extends Error {
  readonly recoverable: boolean;
  readonly source: string;

  constructor(message: string, source: string, recoverable: boolean) {
    super(message);
    this.name = 'RepositoryError';
    this.source = source;
    this.recoverable = recoverable;
  }
}

export interface StorageAdapter {
  read(key: string): string | null;
  write(key: string, value: string): void;
  remove(key: string): void;
}

/** Default adapter that delegates to `window.localStorage`. */
export const createLocalStorageAdapter = (
  storage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null,
): StorageAdapter => {
  if (!storage) {
    return {
      read: () => null,
      write: () => {
        /* no-op when persistence is unavailable */
      },
      remove: () => {
        /* no-op when persistence is unavailable */
      },
    };
  }
  return {
    read: (key) => storage.getItem(key),
    write: (key, value) => storage.setItem(key, value),
    remove: (key) => storage.removeItem(key),
  };
};

/** Parse a JSON blob, throwing a recoverable RepositoryError on corruption. */
const parseJSON = <T>(key: string, raw: string | null): T => {
  if (raw === null) {
    // Returning the default sentinel is the caller's job; repo simply surfaces
    // "no value stored" by returning null so the store can hydrate defaults.
    throw new RepositoryError(`no persisted value for ${key}`, key, true);
  }
  try {
    return JSON.parse(raw) as T;
  } catch (cause) {
    throw new RepositoryError(
      `persisted value for ${key} is not valid JSON`,
      key,
      true,
    );
  }
};

export interface CompactRepo {
  load(): StorageSnapshot;
  savePreferences(preferences: PersistedPreferences): void;
  saveRecords(records: PersistedRecords): void;
  clear(): void;
}

export const createCompactRepo = (adapter: StorageAdapter): CompactRepo => {
  return {
    load() {
      const preferencesRaw = adapter.read(STORAGE_KEY_PREFERENCES);
      const recordsRaw = adapter.read(STORAGE_KEY_RECORDS);

      let preferences: PersistedPreferences = DEFAULT_PREFERENCES;
      let records: PersistedRecords = DEFAULT_RECORDS;

      if (preferencesRaw !== null) {
        const parsed = parseJSON<PersistedPreferences>(
          STORAGE_KEY_PREFERENCES,
          preferencesRaw,
        );
        // Defensive merge so partial / corrupted shapes never crash the boot.
        preferences = {
          ...DEFAULT_PREFERENCES,
          ...parsed,
          counts: { ...DEFAULT_PREFERENCES.counts, ...(parsed.counts ?? {}) },
        };
      }

      if (recordsRaw !== null) {
        const parsed = parseJSON<PersistedRecords>(
          STORAGE_KEY_RECORDS,
          recordsRaw,
        );
        records = {
          records: Array.isArray(parsed.records) ? parsed.records : [],
        };
      }

      return { preferences, records };
    },

    savePreferences(preferences) {
      adapter.write(
        STORAGE_KEY_PREFERENCES,
        JSON.stringify(preferences),
      );
    },

    saveRecords(records) {
      adapter.write(STORAGE_KEY_RECORDS, JSON.stringify(records));
    },

    clear() {
      adapter.remove(STORAGE_KEY_PREFERENCES);
      adapter.remove(STORAGE_KEY_RECORDS);
    },
  };
};
