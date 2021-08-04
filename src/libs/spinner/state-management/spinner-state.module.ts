import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromSpinner from './spinner.reducer';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    StoreModule.forFeature(fromSpinner.spinnerFeatureKey, fromSpinner.reducer),
    CommonModule
  ]
})
export class SpinnerStateModule {}
