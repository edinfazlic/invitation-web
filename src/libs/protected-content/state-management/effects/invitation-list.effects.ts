import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationService} from '../../services/invitation.service';
import {getInvitationsAction, getInvitationsSuccessAction, navigateToInvitationList} from '../invitation.actions';

@Injectable()
export class InvitationListEffects {

  @Effect()
  fetchInvitationList$ = this.actions$.pipe(
    ofType(getInvitationsAction),
    switchMap(() => {
      return this.invitationService.getInvitationList().pipe(
        switchMap(result => {
          return [
            getInvitationsSuccessAction({items: result})
          ];
        })
      );
    })
  );

  @Effect()
  navigateToInvitationList$ = this.actions$.pipe(
    ofType(navigateToInvitationList),
    switchMap(() => {
      this.router.navigate([
        this.routeNames.Invitation.Entry,
      ]);

      return [];
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private invitationService: InvitationService,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }
}
