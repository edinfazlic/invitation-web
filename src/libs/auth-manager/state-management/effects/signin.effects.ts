import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {switchMap} from 'rxjs/operators';
import {SignInService} from '../../services/sign-in.service';
import {navigateToEntryPage, resetSignInData, signInAction, signInSuccessAction} from '../auth-manager.actions';

@Injectable()
export class SignInEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType(signInAction),
    switchMap((payload) => {
      this.store.dispatch(resetSignInData());
      return this.signInService.logIn(payload).pipe(
        switchMap(value => {
          return [
            signInSuccessAction({accessToken: value.token}),
          ];
        })
      );
    }),
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(signInSuccessAction),
    switchMap(() => {
      return [
        navigateToEntryPage()
      ];
    }),
  );

  constructor(
    private signInService: SignInService,
    private actions$: Actions,
    private store: Store,
  ) {
  }
}
