import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../core/routes';
import {getInvitationDetailsAction, getInvitationDetailsSuccessAction} from '../state-management/actions/invitation-details.actions';

@Injectable()
export class InvitationDetailsGuard implements CanActivate {

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(getInvitationDetailsAction({id: route.params[this.routeNames.Invitation.Parameter.id]}));

    return this.actions$.pipe(
      ofType(getInvitationDetailsSuccessAction),
      switchMap(() => of(true))
    );
  }

}
