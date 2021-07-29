import {InjectionToken} from '@angular/core';

export const StorageKey = new InjectionToken<string>('Storage Key (prefix)');

export const Storage = new InjectionToken<any>('Storage');
