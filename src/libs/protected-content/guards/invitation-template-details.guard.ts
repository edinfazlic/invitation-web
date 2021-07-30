import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../core/routes';
import {
  getInvitationTemplateDetailsAction,
  getInvitationTemplateDetailsSuccessAction
} from '../state-management/actions/invitation-template-details.actions';

@Injectable()
export class InvitationTemplateDetailsGuard implements CanActivate {

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(getInvitationTemplateDetailsAction({id: route.params[this.routeNames.InvitationTemplate.Parameter.id]}));

    return this.actions$.pipe(
      ofType(getInvitationTemplateDetailsSuccessAction),
      switchMap(() => of(true))
    );
  }

}
