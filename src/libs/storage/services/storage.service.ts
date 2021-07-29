import {Inject, Injectable} from '@angular/core';
import {Storage, StorageKey} from '../storage.injection-token';

@Injectable({
  providedIn: 'root',
})
export class StorageService<KeyType> {
  constructor(
    @Inject(StorageKey) private prefix,
    @Inject(Storage) private storage
  ) {
  }

  setItem(key: KeyType, item: any): void {
    const serialized = JSON.stringify(item);
    this.storage.setItem(this.getPrefixedKey(key), serialized);
  }

  getItem<ItemType = any>(key: KeyType, defaultItem?: ItemType): ItemType {
    const serialized = this.storage.getItem(this.getPrefixedKey(key));
    return JSON.parse(serialized) || defaultItem;
  }

  removeItem(key: KeyType): void {
    this.storage.removeItem(this.getPrefixedKey(key));
  }

  extendItem(key: KeyType, extension: { [key: string]: any }): void {
    const item = this.getItem(key);
    this.setItem(key, {
      ...item,
      ...extension
    });
  }

  getPrefixedKey(key: KeyType): string {
    return `${this.prefix || ''}_${key}`;
  }
}
