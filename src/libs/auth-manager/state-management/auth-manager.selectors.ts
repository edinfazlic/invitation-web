import {createSelector} from '@ngrx/store';
import {StorageKeys} from '../../core';
import {AuthManagerState, featureAuthMangerKey} from './auth-manager.reducers';

const selectAuth = (state: AuthManagerState) => state[featureAuthMangerKey];

export const selectAccessToken = createSelector(
  selectAuth,
  (state: AuthManagerState): string => state.accessToken || (localStorage.getItem(StorageKeys.Auth) as any)?.accessToken
);
