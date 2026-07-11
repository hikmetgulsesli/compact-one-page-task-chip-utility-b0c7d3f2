import {
  CompactOnePageTaskChipUtilityProvider,
  useCompactOnePageTaskChipUtility,
} from './features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.store';
import {
  EmptyAndErrorRecoveryCompactOnePageTaskChipUtility,
  RecordEditorCompactOnePageTaskChipUtility,
  RecordOperationsCompactOnePageTaskChipUtility,
} from './screens';
import { useAppBridge } from './test/bridge';

/**
 * The Compact One Page Task Chip Utility is rendered as a single generated
 * Stitch surface. The generated screen owns the entire visual viewport; the
 * application shell does not wrap it in additional navigation, status, or
 * diagnostic chrome. Any runtime/smoke/debug state lives on `window.app` via
 * the test bridge and is never rendered into the page.
 */

type RecordOperationsProps = Parameters<
  typeof RecordOperationsCompactOnePageTaskChipUtility
>[0];
type RecordEditorProps = Parameters<typeof RecordEditorCompactOnePageTaskChipUtility>[0];
type EmptyAndErrorProps = Parameters<
  typeof EmptyAndErrorRecoveryCompactOnePageTaskChipUtility
>[0];

const RECORD_OPERATIONS_ACTIONS: RecordOperationsProps['actions'] = {};
const RECORD_EDITOR_ACTIONS: RecordEditorProps['actions'] = {};
const EMPTY_AND_ERROR_ACTIONS: EmptyAndErrorProps['actions'] = {};

function CurrentSurface() {
  const { activeSurface } = useCompactOnePageTaskChipUtility();

  if (activeSurface === 'SURF_RECORD_OPERATIONS') {
    return (
      <div
        data-setfarm-root="compact-one-page-task-chip-utility"
        data-setfarm-surface={activeSurface}
        data-testid="setfarm-app-root"
        className="min-h-screen w-full"
      >
        <RecordOperationsCompactOnePageTaskChipUtility actions={RECORD_OPERATIONS_ACTIONS} />
      </div>
    );
  }

  if (activeSurface === 'SURF_RECORD_EDITOR') {
    return (
      <div
        data-setfarm-root="compact-one-page-task-chip-utility"
        data-setfarm-surface={activeSurface}
        data-testid="setfarm-app-root"
        className="min-h-screen w-full"
      >
        <RecordEditorCompactOnePageTaskChipUtility actions={RECORD_EDITOR_ACTIONS} />
      </div>
    );
  }

  return (
    <div
      data-setfarm-root="compact-one-page-task-chip-utility"
      data-setfarm-surface={activeSurface}
      data-testid="setfarm-app-root"
      className="min-h-screen w-full"
    >
      <EmptyAndErrorRecoveryCompactOnePageTaskChipUtility
        actions={EMPTY_AND_ERROR_ACTIONS}
      />
    </div>
  );
}

function AppShell() {
  // Mount the diagnostic snapshot onto `window.app` so tests can observe
  // shared shell state without injecting visible chrome into the viewport.
  useAppBridge();
  return <CurrentSurface />;
}

export default function App() {
  return (
    <CompactOnePageTaskChipUtilityProvider>
      <AppShell />
    </CompactOnePageTaskChipUtilityProvider>
  );
}