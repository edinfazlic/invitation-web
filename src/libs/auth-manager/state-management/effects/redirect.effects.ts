import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {logoutFinished, navigateToSignInPage} from '../auth-manager.actions';

@Injectable()
export class RedirectEffects {

  @Effect()
  openSignInPage$ = this.actions$.pipe(
    ofType(
      navigateToSignInPage,
      logoutFinished
    ),
    switchMap(() => {
      this.router.navigate([
        this.routeNames.Login.Base
      ]);

      return [];
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }
}
