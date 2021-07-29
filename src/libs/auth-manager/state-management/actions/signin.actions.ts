import {createAction, props} from '@ngrx/store';
import {SignInForm} from '../../models/interfaces/sign-in-form.interface';

export const resetSignInData = createAction('[Auth Manager] Reset Sign In Data');

export const signInAction = createAction(
  '[Auth Manager] Sign In',
  props<SignInForm>()
);

export const signInSuccessAction = createAction(
  '[Auth Manager] Sign In Success',
  props<{ accessToken: string }>()
);

export const signInFailureAction = createAction(
  '[Auth Manager] Sign In Failure',
  props<{ error: any }>()
);
