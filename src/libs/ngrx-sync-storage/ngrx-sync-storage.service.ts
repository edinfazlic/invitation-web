import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {NgRxStorageSyncConfig} from './models/ngrx-sync-storage-config.interface';
import {getKey} from './ngx-sync-storage.utils';

@Injectable()
export class NgrxSyncStorageService {
  constructor(
    private store: Store
  ) {
  }

  listenStateChanges(config: NgRxStorageSyncConfig): void {
    const storageKey = getKey(config.storageKey, config.prefixStorageKey);

    if (config.childKeys) {
      config.childKeys.forEach((key) => {
        this.addSubscription(config.storeName, storageKey, config.initialState, {childKey: key, skipKeys: config.skipKeys});
      });
    } else {
      this.addSubscription(config.storeName, storageKey, config.initialState, {skipKeys: config.skipKeys});
    }
  }

  private addSubscription(
    storeName: string,
    storageKey: string,
    initialState: any,
    config: { childKey?: string, skipKeys: string[] }
  ): void {
    this.store
      .select((state) => config.childKey ? state[storeName][config.childKey] : state[storeName])
      .subscribe((newState) => {
        const oldState = JSON.parse(localStorage.getItem(storageKey) || '{}');

        const filteredState = Object
          .entries({...oldState, ...newState})
          .reduce((acc, [key, stateValue]) => {
            if (!config.skipKeys?.includes(key) && (initialState[key] !== stateValue)) {
              acc[key] = stateValue;
            }

            return acc;
          }, {});

        localStorage.setItem(storageKey, JSON.stringify(filteredState));
      });
  }
}
