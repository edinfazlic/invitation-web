import {Action, createReducer, on} from '@ngrx/store';
import {NgRxStorageSyncConfig} from '../../ngrx-sync-storage';
import {StorageKeys} from '../../core';
import {logoutFinished, resetSignInData, signInSuccessAction} from './auth-manager.actions';

export const featureAuthMangerKey = 'auth-manager';

export interface AuthManagerState {
  error?: any;
  accessToken: string;
}

export const initialState: AuthManagerState = {
  accessToken: '',
};

export const authMangerReducer = createReducer(
  initialState,

  on(signInSuccessAction, (state: AuthManagerState, {accessToken}) => ({...state, accessToken})),
  on(resetSignInData, (state: AuthManagerState) => ({...state, accessToken: null})),
);

export function createAuthMangerReducer(
  state: AuthManagerState,
  action: Action): any {
  return authMangerReducer(state, action);
}

export const authMangerSyncConfig: NgRxStorageSyncConfig = {
  initialState,
  prefixStorageKey: 'invitation_storage',
  storageKey: StorageKeys.Auth,
  storeName: featureAuthMangerKey,
  skipKeys: ['error'],
  rehydrate: new Map([
    [
      logoutFinished.type,
      {}
    ],
    [
      resetSignInData.type,
      {
        excludeKeys: [
          'accessToken',
        ]
      }
    ],
  ])
};
