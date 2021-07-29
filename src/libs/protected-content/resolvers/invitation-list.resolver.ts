import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {InvitationListItem} from '../models/invitation-list-item.model';
import {getInvitationsAction, getInvitationsSuccessAction} from '../state-management/actions/invitation-list.actions';

@Injectable()
export class InvitationListResolver implements Resolve<InvitationListItem[]> {

  constructor(
    private store: Store,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvitationListItem[]> {
    this.store.dispatch(getInvitationsAction());

    return this.actions$.pipe(
      ofType(getInvitationsSuccessAction),
      switchMap((value) => of(value.items))
    );
  }

}
