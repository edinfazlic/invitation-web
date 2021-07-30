import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {FEATURE_STORE_CONFIG, NgrxSyncStorageModule} from '../../ngrx-sync-storage';
import {AuthManagerState, authMangerSyncConfig, createAuthMangerReducer, featureAuthMangerKey} from './auth-manager.reducers';
import {LogoutEffects} from './effects/logout.effects';
import {RedirectEffects} from './effects/redirect.effects';
import {SignInEffects} from './effects/signin.effects';

@NgModule({
  imports: [
    StoreModule.forFeature<AuthManagerState, any>(featureAuthMangerKey, createAuthMangerReducer, FEATURE_STORE_CONFIG),

    RouterModule,
    NgrxSyncStorageModule.forFeature(authMangerSyncConfig),

    EffectsModule.forFeature([
      RedirectEffects,
      SignInEffects,
      LogoutEffects,
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthManagerStateModule {
}
