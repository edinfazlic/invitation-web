import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {SignInService} from '../../services/sign-in.service';
import {logout, navigateToSignInPage, resetSignInData} from '../auth-manager.actions';

@Injectable()
export class LogoutEffects {

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(logout),
    switchMap(() => {
        return [
          resetSignInData(),
          navigateToSignInPage(),
        ];
      }
    ),
  );

  constructor(
    private signInService: SignInService,
    private actions$: Actions,
  ) {
  }
}
