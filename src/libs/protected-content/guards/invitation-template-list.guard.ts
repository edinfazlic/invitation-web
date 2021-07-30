import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
  getInvitationTemplatesAction,
  getInvitationTemplatesSuccessAction
} from '../state-management/actions/invitation-template-list.actions';

@Injectable()
export class InvitationTemplateListGuard implements CanActivate {

  constructor(
    private store: Store,
    private actions$: Actions
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(getInvitationTemplatesAction());

    return this.actions$.pipe(
      ofType(getInvitationTemplatesSuccessAction),
      switchMap(() => of(true))
    );
  }

}
