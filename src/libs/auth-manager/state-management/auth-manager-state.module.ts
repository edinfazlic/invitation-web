import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FEATURE_STORE_CONFIG, NgrxSyncStorageModule} from '../../ngrx-sync-storage';
import {AuthManagerState, authMangerSyncConfig, createAuthMangerReducer, featureAuthMangerKey} from './auth-manager.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature<AuthManagerState, any>(featureAuthMangerKey, createAuthMangerReducer, FEATURE_STORE_CONFIG),

    RouterModule,
    NgrxSyncStorageModule.forFeature(authMangerSyncConfig),

    EffectsModule.forFeature([]),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthManagerStateModule {
}
