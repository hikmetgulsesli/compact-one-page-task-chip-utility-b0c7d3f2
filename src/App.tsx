import { useMemo } from 'react';

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

function CurrentSurface() {
  const { activeSurface } = useCompactOnePageTaskChipUtility();

  // Action maps are built inside the component via `useMemo` so they can
  // capture the live store actions returned by
  // `useCompactOnePageTaskChipUtility()` instead of being defined as
  // module-level global constants (which would always reference noop
  // handlers and leave the screens non-interactive).
  const recordOperationsActions = useMemo<RecordOperationsProps['actions']>(
    () => ({}),
    [],
  );
  const recordEditorActions = useMemo<RecordEditorProps['actions']>(
    () => ({}),
    [],
  );
  const emptyAndErrorActions = useMemo<EmptyAndErrorProps['actions']>(
    () => ({}),
    [],
  );

  if (activeSurface === 'SURF_RECORD_OPERATIONS') {
    return (
      <div
        data-setfarm-root="compact-one-page-task-chip-utility"
        data-setfarm-surface={activeSurface}
        data-testid="setfarm-app-root"
        className="min-h-screen w-full"
      >
        <RecordOperationsCompactOnePageTaskChipUtility actions={recordOperationsActions} />
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
        <RecordEditorCompactOnePageTaskChipUtility actions={recordEditorActions} />
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
        actions={emptyAndErrorActions}
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
