import { useEffect } from 'react';

import {
  useCompactOnePageTaskChipUtility,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.store';
import type {
  AppPanel,
  StoreContextValue,
} from '../features/compact-one-page-task-chip-utility/compact-one-page-task-chip-utility.types';

/**
 * Mounts the runtime app snapshot onto `window.app` so smoke tests and
 * diagnostic harnesses can observe the shared shell state without rendering
 * any visible chrome around the generated screens.
 */

export interface AppBridgeSnapshot extends StoreContextValue {
  readonly version: string;
}

export interface AppBridge {
  get(): AppBridgeSnapshot;
}

const APP_BRIDGE_VERSION = '1.0.0';

const emptySnapshot: AppBridgeSnapshot = {
  version: APP_BRIDGE_VERSION,
  activeSurface: 'SURF_RECORD_OPERATIONS',
  activePanel: 'list' as AppPanel,
  selectedRecord: null,
  records: [],
  counts: { total: 0, active: 0, pending: 0, done: 0, archived: 0 },
  storageStatus: 'idle',
  lastError: null,
  goToSurface: () => undefined,
  goToPanel: () => undefined,
  selectRecord: () => undefined,
  updateRecordStatus: () => undefined,
  clearCache: () => undefined,
  exportJSON: () => '',
};

interface AppBridgeHost {
  app?: AppBridge;
}

export function useAppBridge(): StoreContextValue {
  const value = useCompactOnePageTaskChipUtility();

  useEffect(() => {
    const host = globalThis as AppBridgeHost;
    const snapshot: AppBridgeSnapshot = {
      version: APP_BRIDGE_VERSION,
      ...value,
    };
    host.app = {
      get: () => snapshot,
    };
    return () => {
      if (host.app && host.app.get() === snapshot) {
        delete host.app;
      }
    };
  }, [
    value,
  ]);

  return value;
}

export function getAppBridgeSnapshot(): AppBridgeSnapshot | null {
  const host = globalThis as AppBridgeHost;
  return host.app ? host.app.get() : null;
}