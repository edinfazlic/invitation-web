import { createFeatureSelector, createSelector } from '@ngrx/store';
import { spinnerFeatureKey, SpinnerState } from './spinner.reducer';

export const getSpinnerState = createFeatureSelector<SpinnerState>(spinnerFeatureKey);

export const getSpinnerCounter = createSelector(
  getSpinnerState, (state: SpinnerState) => state
);
