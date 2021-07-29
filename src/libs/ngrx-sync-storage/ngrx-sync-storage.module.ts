import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgRxStorageSyncConfig} from './models/ngrx-sync-storage-config.interface';
import {NgrxSyncStorageService} from './ngrx-sync-storage.service';
import {provideSyncConnect} from './provide-sync-connect';

@NgModule({})
export class NgrxSyncStorageModule {
  static forFeature(config: NgRxStorageSyncConfig): ModuleWithProviders<NgrxSyncStorageModule> {
    return {
      ngModule: NgrxSyncStorageModule,
      providers: [
        NgrxSyncStorageService,
        provideSyncConnect(config)
      ],
    };
  }
}
