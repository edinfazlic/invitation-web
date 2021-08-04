import { Action, createReducer, on } from '@ngrx/store';
import * as SpinnerActions from './spinner.actions';

export const spinnerFeatureKey = 'spinner';

export interface SpinnerState {
  counter: number;
}

export const initialState: SpinnerState = {
  counter: 0
};

const spinnerReducer = createReducer<SpinnerState>(
  initialState,
  on(SpinnerActions.showSpinnerAction, (state) => ({
    ...state,
    counter: state.counter + 1
  })),
  on(SpinnerActions.hideSpinnerAction, (state) => ({
    ...state,
    counter: state.counter > 0 ? state.counter - 1 : 0
  }))
);

export function reducer(state: SpinnerState, action: Action): SpinnerState {
  return spinnerReducer(state, action);
}
