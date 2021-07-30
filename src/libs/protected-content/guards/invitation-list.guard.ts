import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {getInvitationsAction, getInvitationsSuccessAction} from '../state-management/actions/invitation-list.actions';

@Injectable()
export class InvitationListGuard implements CanActivate {

  constructor(
    private store: Store,
    private actions$: Actions
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(getInvitationsAction());

    return this.actions$.pipe(
      ofType(getInvitationsSuccessAction),
      switchMap(() => of(true))
    );
  }

}
