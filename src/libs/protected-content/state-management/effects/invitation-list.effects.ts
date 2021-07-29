import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import {InvitationService} from '../../services/invitation.service';
import {getInvitationsAction, getInvitationsSuccessAction} from '../invitation.actions';

@Injectable()
export class InvitationListEffects {

  @Effect()
  openSignInPage$ = this.actions$.pipe(
    ofType(getInvitationsAction),
    switchMap(() => {
      return this.invitationService.getInvitationList().pipe(
        map(result => {
          return [
            getInvitationsSuccessAction({items: result})
          ];
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private invitationService: InvitationService,
  ) {
  }
}
