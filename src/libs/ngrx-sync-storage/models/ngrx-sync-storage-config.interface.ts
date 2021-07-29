import {NgRxRehydrateItemConfig} from './ngrx-rehydrate-item-config.interface';

export interface NgRxStorageSyncConfig<IState = any> {
  /** Initial State */
  initialState: IState;

  /** Prefix for a local storage group key */
  prefixStorageKey?: string;

  /** This key is used for filling state from local storage after page reloading */
  storageKey: any;

  storeName?: string;
  childKeys?: string[];
  skipKeys?: string[];

  /**
   * It is used to reset state by defined action in the option payload.
   * You can declare initialState that will be set instead of the current one.
   */
  rehydrate?: Map<string, NgRxRehydrateItemConfig>;
}
