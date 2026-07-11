import type {
  Preferences,
  TaskCounts,
  TaskRecord,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

/**
 * Bundled sample tasks. Sibling screen-owner stories import this fixture when
 * the persistence layer is unavailable or the store has just booted.
 *
 * Timestamps are stable so tests can assert against them deterministically.
 */
export const SAMPLE_RECORDS: ReadonlyArray<TaskRecord> = [
  {
    id: 'task-q4-financial-review',
    title: 'Q4 Financial Review',
    description:
      'Walk through Q4 numbers with the finance team and capture the highlights for the board deck.',
    status: 'active',
    tags: ['finance', 'quarterly'],
    archived: false,
    createdAt: 1_716_000_000_000,
    updatedAt: 1_716_000_000_000,
  },
  {
    id: 'task-onboarding-ux-research',
    title: 'Onboarding UX research',
    description:
      'Synthesize the latest onboarding interviews and tag themes for the next design review.',
    status: 'pending',
    tags: ['research', 'design'],
    archived: false,
    createdAt: 1_716_086_400_000,
    updatedAt: 1_716_086_400_000,
  },
  {
    id: 'task-sunset-legacy-billing',
    title: 'Sunset legacy billing',
    description:
      'Migrate remaining customers off the legacy billing flow and archive the project once closed.',
    status: 'done',
    tags: ['platform', 'cleanup'],
    archived: false,
    createdAt: 1_716_172_800_000,
    updatedAt: 1_716_259_200_000,
  },
  {
    id: 'task-archive-2024-launch-checklist',
    title: '2024 launch checklist archive',
    description:
      'Move the completed 2024 launch checklist into the archives so the new year starts clean.',
    status: 'done',
    tags: ['archive'],
    archived: true,
    createdAt: 1_716_345_600_000,
    updatedAt: 1_716_432_000_000,
  },
];

function deriveCounts(records: ReadonlyArray<TaskRecord>): TaskCounts {
  let active = 0;
  let pending = 0;
  let done = 0;
  let archived = 0;
  for (const record of records) {
    if (record.archived) {
      archived += 1;
      // Archived tasks are excluded from active/pending/done status
      // buckets to keep the active pool metrics accurate and avoid
      // double-counting across status categories.
      continue;
    }
    switch (record.status) {
      case 'active':
        active += 1;
        break;
      case 'pending':
        pending += 1;
        break;
      case 'done':
        done += 1;
        break;
    }
  }
  return {
    total: records.length,
    active,
    pending,
    done,
    archived,
  };
}

export const SAMPLE_COUNTS: TaskCounts = deriveCounts(SAMPLE_RECORDS);

export const DEFAULT_PREFERENCES: Preferences = {
  activeSurface: 'SURF_RECORD_OPERATIONS',
  activePanel: 'list',
  selectedRecordId: null,
  counts: SAMPLE_COUNTS,
};

export { deriveCounts };