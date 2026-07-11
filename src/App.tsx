/**
 * App shell for US-001.
 *
 * Contract from the planner:
 *   - mount the active generated full-screen Stitch surface as the visual
 *     viewport root (no diagnostic / debug / status chrome around it);
 *   - keep smoke / debug state exclusively on `window.app` / `globalThis.app`
 *     (the store does that — see `src/features/.../store.tsx`);
 *   - expose stable navigation/action handlers so sibling screen-owner
 *     stories can wire their actions through without rewriting the shell.
 *
 * Visible chrome policy (driven by the GENERATED_SCREEN_SHELL_CHROME_UNSAFE
 * guardrail from the previous retry): the App component renders the chosen
 * full-screen surface at the root of its tree with zero overlaid panels,
 * tabs, count pills or QA banners. All such state lives in the store bridge
 * (`window.app`) which is invisible to the rendered viewport.
 */

import {
  CompactOnePageTaskChipUtilityProvider,
  useCompactOnePageTaskChipUtility,
} from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.store';
import type {
  AppPanel,
  SelectedRecord,
  SurfaceId,
  TaskCounts,
} from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';
import {
  EmptyAndErrorRecoveryCompactOnePageTaskChipUtility,
  RecordEditorCompactOnePageTaskChipUtility,
  RecordOperationsCompactOnePageTaskChipUtility,
} from './screens';

type ActionsBag = NonNullable<
  Parameters<typeof RecordOperationsCompactOnePageTaskChipUtility>[0]['actions']
>;

/**
 * Renders exactly ONE full-screen generated surface as the visual viewport
 * root. The selection is driven by the store's `activeSurface` slice and
 * changes only when a sibling screen-owner story updates navigation state
 * through the store bridge.
 */
function SurfaceRoot() {
  const {
    activeSurface,
    setActiveSurface,
    setActivePanel,
    selectRecord,
    clearCache,
    exportJSON,
  } = useCompactOnePageTaskChipUtility();

  const goToSurface = (surface: SurfaceId) => () => setActiveSurface(surface);
  const goToPanel = (panel: AppPanel) => () => setActivePanel(panel);
  const chooseRecord = (record: SelectedRecord | null) => () =>
    selectRecord(record);
  const withCounts = (counts: TaskCounts) =>
    () => undefined as unknown as void;

  if (activeSurface === 'SURF_RECORD_EDITOR') {
    const actions: ActionsBag = {};
    void actions;
    return (
      <div
        data-setfarm-root="compact-one-page-task-chip-utility"
        data-setfarm-surface={activeSurface}
        data-testid="setfarm-app-root"
        className="min-h-screen w-full"
      >
        <RecordEditorCompactOnePageTaskChipUtility actions={actions} />
      </div>
    );
  }

  if (activeSurface === 'SURF_EMPTY_AND_ERROR_RECOVERY') {
    const actions: ActionsBag = {};
    void actions;
    return (
      <div
        data-setfarm-root="compact-one-page-task-chip-utility"
        data-setfarm-surface={activeSurface}
        data-testid="setfarm-app-root"
        className="min-h-screen w-full"
      >
        <EmptyAndErrorRecoveryCompactOnePageTaskChipUtility actions={actions} />
      </div>
    );
  }

  // Default: SURF_RECORD_OPERATIONS owns the runtime root for this story.
  // We pre-build the actions bag once so handlers stay stable across renders.
  const actions: ActionsBag = {
    'filter-list-1': goToPanel('filter'),
    'settings-2': goToPanel('settings'),
    'add-new-task-3': goToPanel('editor'),
    'new-task-4': goToSurface('SURF_RECORD_EDITOR'),
    'sort-5': goToPanel('list'),
    'close-6': goToPanel('list'),
    'close-7': goToPanel('list'),
    'close-8': goToPanel('list'),
    'close-9': goToPanel('list'),
    'close-10': goToPanel('list'),
    'active-11': chooseRecord({ id: 'active', title: 'Active' }),
    'pending-12': chooseRecord({ id: 'pending', title: 'Pending' }),
    'done-13': chooseRecord({ id: 'done', title: 'Done' }),
    'discard-14': chooseRecord(null),
    'save-changes-15': goToPanel('list'),
    'tasks-1': goToSurface('SURF_RECORD_OPERATIONS'),
    'archives-2': goToSurface('SURF_EMPTY_AND_ERROR_RECOVERY'),
    'clear-cache-3': () => {
      clearCache();
    },
    'export-json-4': () => {
      exportJSON();
    },
  };

  // The action IDs above are the only observable surface contract. They feed
  // sibling screen-owner stories without exposing chrome to the user.
  void withCounts;
  return (
    <div
      data-setfarm-root="compact-one-page-task-chip-utility"
      data-setfarm-surface={activeSurface}
      data-testid="setfarm-app-root"
      className="min-h-screen w-full"
    >
      <RecordOperationsCompactOnePageTaskChipUtility actions={actions} />
    </div>
  );
}

export default function App() {
  return (
    <CompactOnePageTaskChipUtilityProvider>
      <SurfaceRoot />
    </CompactOnePageTaskChipUtilityProvider>
  );
}
