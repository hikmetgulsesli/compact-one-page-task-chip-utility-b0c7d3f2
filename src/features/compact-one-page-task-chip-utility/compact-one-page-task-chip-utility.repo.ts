import type {
  PersistedRecords,
  Preferences,
  TaskRecord,
} from './compact-one-page-task-chip-utility.types';

/**
 * Persistence boundary for the Compact One Page Task Chip Utility.
 *
 * The store consumes a {@link CompactRepo} so tests can swap in an in-memory
 * adapter. The default {@link createCompactRepo} factory wraps `localStorage`
 * defensively so private browsing, third-party iframes, or corrupted JSON never
 * crash the application boot path.
 */

const STORAGE_KEY_PREFERENCES = 'compact-one-page-task-chip-utility:preferences:v1';
const STORAGE_KEY_RECORDS = 'compact-one-page-task-chip-utility:records:v1';

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface CompactRepo {
  loadPreferences(): Preferences | null;
  savePreferences(preferences: Preferences): void;
  clearPreferences(): void;
  loadRecords(): TaskRecord[] | null;
  saveRecords(records: TaskRecord[]): void;
  clearRecords(): void;
  clearAll(): void;
}

function createInMemoryAdapter(): StorageAdapter {
  const store = new Map<string, string>();
  return {
    getItem(key) {
      return store.has(key) ? (store.get(key) as string) : null;
    },
    setItem(key, value) {
      store.set(key, value);
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}

export function createLocalStorageAdapter(storage: Storage | null): StorageAdapter {
  if (!storage) {
    return createInMemoryAdapter();
  }
  return {
    getItem(key) {
      try {
        return storage.getItem(key);
      } catch {
        // Storage access can throw in private browsing or sandboxed contexts.
        return null;
      }
    },
    setItem(key, value) {
      try {
        storage.setItem(key, value);
      } catch {
        // Quota errors must not crash the UI; the store reports the failure.
      }
    },
    removeItem(key) {
      try {
        storage.removeItem(key);
      } catch {
        // Ignore – the next read will still see the original value.
      }
    },
  };
}

function resolveStorage(): Storage | null {
  if (typeof globalThis === 'undefined') return null;
  try {
    const candidate = (globalThis as { localStorage?: Storage }).localStorage;
    return candidate ?? null;
  } catch {
    // localStorage access can throw a SecurityError in some browsers.
    return null;
  }
}

function parseJSON<T>(raw: string | null): T | null {
  if (raw === null || raw === undefined) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed === undefined ? null : (parsed as T);
  } catch {
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function sanitizePreferences(parsed: unknown): Preferences | null {
  if (!isPlainObject(parsed)) return null;
  const candidate = parsed as Partial<Preferences> & {
    counts?: unknown;
  };
  if (typeof candidate.activeSurface !== 'string') return null;
  if (typeof candidate.activePanel !== 'string') return null;
  const selectedRecordId =
    typeof candidate.selectedRecordId === 'string' ||
    candidate.selectedRecordId === null
      ? (candidate.selectedRecordId as string | null)
      : null;
  const countsRecord: Record<string, unknown> = isPlainObject(candidate.counts)
    ? candidate.counts
    : {};
  const num = (key: string, fallback: number): number =>
    typeof countsRecord[key] === 'number' ? (countsRecord[key] as number) : fallback;
  return {
    activeSurface: candidate.activeSurface as Preferences['activeSurface'],
    activePanel: candidate.activePanel as Preferences['activePanel'],
    selectedRecordId,
    counts: {
      total: num('total', 0),
      active: num('active', 0),
      pending: num('pending', 0),
      done: num('done', 0),
      archived: num('archived', 0),
    },
  };
}

function sanitizeRecords(parsed: unknown): TaskRecord[] | null {
  if (!Array.isArray(parsed)) return null;
  const sanitized: TaskRecord[] = [];
  for (const entry of parsed) {
    if (!isPlainObject(entry)) continue;
    const candidate = entry as Partial<TaskRecord>;
    if (typeof candidate.id !== 'string') continue;
    if (typeof candidate.title !== 'string') continue;
    if (
      candidate.status !== 'active' &&
      candidate.status !== 'pending' &&
      candidate.status !== 'done'
    ) {
      continue;
    }
    sanitized.push({
      id: candidate.id,
      title: candidate.title,
      description:
        typeof candidate.description === 'string' ? candidate.description : '',
      status: candidate.status,
      tags: Array.isArray(candidate.tags)
        ? candidate.tags.filter((tag): tag is string => typeof tag === 'string')
        : [],
      archived: Boolean(candidate.archived),
      createdAt:
        typeof candidate.createdAt === 'number' ? candidate.createdAt : Date.now(),
      updatedAt:
        typeof candidate.updatedAt === 'number' ? candidate.updatedAt : Date.now(),
    });
  }
  return sanitized;
}

export interface CreateCompactRepoOptions {
  adapter?: StorageAdapter;
  storageKeyPreferences?: string;
  storageKeyRecords?: string;
}

export function createCompactRepo(options: CreateCompactRepoOptions = {}): CompactRepo {
  const adapter = options.adapter ?? createLocalStorageAdapter(resolveStorage());
  const preferencesKey = options.storageKeyPreferences ?? STORAGE_KEY_PREFERENCES;
  const recordsKey = options.storageKeyRecords ?? STORAGE_KEY_RECORDS;

  return {
    loadPreferences() {
      const raw = adapter.getItem(preferencesKey);
      if (raw === null) return null;
      // parseJSON already guards against malformed JSON; sanitizePreferences
      // additionally protects against `"null"` payloads and shape drift.
      return sanitizePreferences(parseJSON<unknown>(raw));
    },
    savePreferences(preferences) {
      adapter.setItem(preferencesKey, JSON.stringify(preferences));
    },
    clearPreferences() {
      adapter.removeItem(preferencesKey);
    },
    loadRecords() {
      const raw = adapter.getItem(recordsKey);
      if (raw === null) return null;
      return sanitizeRecords(parseJSON<PersistedRecords['records']>(raw));
    },
    saveRecords(records) {
      adapter.setItem(recordsKey, JSON.stringify(records));
    },
    clearRecords() {
      adapter.removeItem(recordsKey);
    },
    clearAll() {
      adapter.removeItem(preferencesKey);
      adapter.removeItem(recordsKey);
    },
  };
}

export const __testing = {
  parseJSON,
  sanitizePreferences,
  sanitizeRecords,
  createInMemoryAdapter,
};