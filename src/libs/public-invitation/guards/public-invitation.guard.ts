import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../core/routes';
import {getPublicInvitationAction, getPublicInvitationSuccessAction} from '../state-management/public-invitation.actions';

@Injectable()
export class PublicInvitationGuard implements CanActivate {

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(getPublicInvitationAction({id: route.params[this.routeNames.Public.Parameter.uuid]}));

    return this.actions$.pipe(
      ofType(getPublicInvitationSuccessAction),
      switchMap(() => of(true))
    );
  }

}
