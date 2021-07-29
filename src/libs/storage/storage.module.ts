import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {StorageService} from './services/storage.service';
import {Storage, StorageKey} from './storage.injection-token';

@NgModule({
  imports: [CommonModule],
  providers: [
    StorageService,
    {
      provide: StorageKey,
      useValue: '',
    },
    {
      provide: Storage,
      useValue: localStorage,
    },
  ],
})
export class StorageModule {
  static forRoot(): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [StorageService],
    };
  }
}
