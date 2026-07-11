/**
 * Test-only bridge that mirrors the production app shell surface.
 *
 * Tests import this to drive the store without needing a full DOM mount,
 * while production uses the same shape via `window.app` exposed by App.tsx.
 */

import type { AppShellBridge } from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

export interface TestBridge extends AppShellBridge {
  /** Disposes any window.app side effect registered by the store. */
  teardown(): void;
}

export const TEST_BRIDGE_KEY = '__compactOnePageTaskChipUtilityTestBridge__';

/**
 * Reads the most recently installed bridge (set by the store on mount).
 * Returns null when the production app shell has not mounted yet, which is the
 * expected case during the very first bootstrap tick.
 */
export const readTestBridge = (): TestBridge | null => {
  if (typeof globalThis === 'undefined') return null;
  return ((globalThis as unknown as Record<string, TestBridge | undefined>)[
    TEST_BRIDGE_KEY
  ]) ?? null;
};
