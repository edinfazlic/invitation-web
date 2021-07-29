import {Inject, Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router, UrlTree} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../core/routes';
import {navigateToSignInPage} from '../state-management/actions/redirect.actions';
import {selectAccessToken} from '../state-management/auth-manager.selectors';

@Injectable()
export class AuthorizedGuard implements CanActivate, CanActivateChild {

  constructor(
    private store: Store,
    private router: Router,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames
  ) {
  }

  canActivateChild(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIfValidToken();
  }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkIfValidToken();
  }

  private checkIfValidToken(): Observable<boolean> {
    return this.store.pipe(
      select(selectAccessToken),
      first(),
      switchMap((accessToken) => {

          if (!accessToken) {
            this.store.dispatch(navigateToSignInPage());

            return of(false);
          }

          return of(true);
        }
      )
    );
  }
}
