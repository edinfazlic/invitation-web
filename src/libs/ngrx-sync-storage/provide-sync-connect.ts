import {APP_INITIALIZER, InjectionToken, Provider} from '@angular/core';
import {NgRxStorageSyncConfig} from './models/ngrx-sync-storage-config.interface';
import {generateSyncLocalStorageMetaReducer} from './ngrx-sync-storage.meta-reducer';
import {NgrxSyncStorageService} from './ngrx-sync-storage.service';

export const SYNC_CONFIG = new InjectionToken('SYNC_CONFIG: Storage sync config');
export const FEATURE_STORE_CONFIG = new InjectionToken('FEATURE_STORE_CONFIG: Feature store config');

export function provideSyncConnectFactory(service: NgrxSyncStorageService, config: NgRxStorageSyncConfig): () => void {
  return () => {
    service.listenStateChanges(config);
  };
}

export function getConfig(config: NgRxStorageSyncConfig): any {
  // return the config synchronously.
  return {
    initialState: config.initialState,

    metaReducers: [
      generateSyncLocalStorageMetaReducer(config)
    ]
  };
}

export function provideSyncConnect(config: NgRxStorageSyncConfig): Provider[] {
  return [
    {
      provide: SYNC_CONFIG,
      useValue: config
    },
    {
      provide: APP_INITIALIZER,
      useFactory: provideSyncConnectFactory,
      deps: [NgrxSyncStorageService, SYNC_CONFIG],
      multi: true,
    },
    {
      provide: FEATURE_STORE_CONFIG,
      useFactory: getConfig,
      deps: [SYNC_CONFIG]
    },
  ];
}
