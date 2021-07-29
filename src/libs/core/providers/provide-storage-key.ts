import {Provider} from '@angular/core';
import {StorageKey} from '../../storage';
import {LOCAL_STORAGE_PREFIX} from '../constants';

export function provideStorageKey(): Provider {
  return (
    {
      provide: StorageKey,
      useValue: LOCAL_STORAGE_PREFIX,
    }
  );
}
