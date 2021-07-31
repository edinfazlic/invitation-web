import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../core/routes';
import {PublicInvitationService} from '../services/public-invitation.service';
import {
  getPublicInvitationAction,
  getPublicInvitationSuccessAction,
  sendInvitationResponseAction,
  sendInvitationResponseSuccessAction
} from './public-invitation.actions';
import {getPublicInvitationDetails} from './public-invitation.selectors';

@Injectable()
export class PublicInvitationEffects {

  @Effect()
  fetchPublicInvitation$ = this.actions$.pipe(
    ofType(getPublicInvitationAction),
    switchMap(({id}) => {
      return this.publicInvitationService.getPublicInvitation(id).pipe(
        switchMap(result => {
          return [
            getPublicInvitationSuccessAction({details: result})
          ];
        })
      );
    })
  );

  @Effect()
  sendInvitationResponse$ = this.actions$.pipe(
    ofType(sendInvitationResponseAction),
    switchMap(({response, invitationId}) => {
      return this.publicInvitationService.sendPublicInvitationResponse(invitationId, response).pipe(
        switchMap(() => {
          return [
            sendInvitationResponseSuccessAction()
          ];
        })
      );
    })
  );

  @Effect()
  sendInvitationResponseSuccess$ = this.actions$.pipe(
    ofType(sendInvitationResponseSuccessAction),
    withLatestFrom(this.store.select(getPublicInvitationDetails)),
    switchMap(([x, publicInvitation]) => {
      return [
        getPublicInvitationAction({id: publicInvitation.uuid})
      ];
    })
  );

  constructor(
    private actions$: Actions,
    private publicInvitationService: PublicInvitationService,
    private store: Store,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }
}
