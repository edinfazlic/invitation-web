import {Action, ActionReducer, MetaReducer, UPDATE} from '@ngrx/store';
import {isArray, isObject} from 'lodash';
import {NgRxRehydrateItemConfig} from './models/ngrx-rehydrate-item-config.interface';
import {NgRxStorageSyncConfig} from './models/ngrx-sync-storage-config.interface';
import {getKey} from './ngx-sync-storage.utils';

/**
 * @description Some features state should be cached in the local storage.
 * For proper synchronization you are able to use metaReducers.
 * This function will return configured metaReducer for sync current feature state wit a localStorage.
 *
 * __Note: That localStorage has limited size for different browser__
 */
export function generateSyncLocalStorageMetaReducer<IState>(
  syncConfig: NgRxStorageSyncConfig<IState>
): MetaReducer<IState, Action> {
  return (actionReducer: ActionReducer<IState>): ActionReducer<IState> => {
    return (state: IState, action: Action): IState => {
      const key = getKey(syncConfig.storageKey, syncConfig.prefixStorageKey);

      if (action.type === UPDATE) {
        state = getSyncedState<IState>(key, state, syncConfig.skipKeys);
      }

      if (syncConfig.rehydrate?.has(action.type)) {
        const rehydrationConfig = syncConfig.rehydrate.get(action.type) || {};

        state = rehydrateOnAction<IState>(key, rehydrationConfig) || syncConfig.initialState;
      }

      return actionReducer(state, action);
    };
  };
}

export function getSyncedState<IState = { [key: string]: any }>(storageKey: any, initialState: IState, skipKeys?: string[]): IState {
  const value: IState = JSON.parse(localStorage.getItem(storageKey) || '{}');

  if (isObject(value) && !isArray(value)) {
    return skipKeys
      ? Object
        .entries<any>({...initialState, ...value})
        .reduce<IState>((acc, [key, stateValue]) => {
          if (!skipKeys.includes(key)) {
            acc[key] = stateValue;
          }

          return acc;
        }, {} as any)
      : {...initialState, ...value};
  }

  return {[storageKey]: value} as any;
}

export function rehydrateOnAction<IState>(storageKey: any, rehydrationConfig: NgRxRehydrateItemConfig): IState {
  let state = JSON.parse(localStorage.getItem(storageKey) || '{}');

  if (!!rehydrationConfig.rehydrateKeys?.length) {
    const newStateKeys = Object.keys(state).filter((key) => !rehydrationConfig.rehydrateKeys.includes(key));

    state = newStateKeys.reduce((acc, stateKey) => {
      acc[stateKey] = state[stateKey];

      return acc;
    }, {});

    localStorage.removeItem(storageKey);
    localStorage.setItem(storageKey, JSON.stringify(state));

    return state;
  }

  if (!!rehydrationConfig.excludeKeys?.length) {
    const newStateKeys = Object.keys(state).filter((key) => rehydrationConfig.excludeKeys.includes(key));

    state = newStateKeys.reduce((acc, stateKey) => {
      acc[stateKey] = state[stateKey];

      return acc;
    }, {});

    localStorage.removeItem(storageKey);
    localStorage.setItem(storageKey, JSON.stringify(state));

    return state;
  }

  localStorage.removeItem(storageKey);

  return;
}
