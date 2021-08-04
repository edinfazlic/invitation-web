import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationService} from '../../services/invitation.service';
import {
  createInvitationAction,
  createInvitationSuccessAction,
  deleteInvitationAction,
  deleteInvitationSuccessAction,
  getInvitationDetailsAction,
  getInvitationDetailsSuccessAction,
  navigateToInvitationCreate,
  navigateToInvitationDetails,
  updateInvitationAction,
  updateInvitationSuccessAction
} from '../actions/invitation-details.actions';
import {navigateToInvitationList} from '../actions/invitation-list.actions';

@Injectable()
export class InvitationDetailsEffects {

  @Effect()
  navigateToInvitationDetails$ = this.actions$.pipe(
    ofType(navigateToInvitationDetails),
    switchMap(({invitationId}) => {
      this.router.navigate([
        this.routeNames.Invitation.Entry,
        invitationId,
      ]);

      return [];
    })
  );

  @Effect()
  fetchInvitationDetails$ = this.actions$.pipe(
    ofType(getInvitationDetailsAction),
    switchMap(({id}) => {
      return this.invitationService.getInvitationDetails(id).pipe(
        switchMap(result => {
          return [
            getInvitationDetailsSuccessAction({details: result})
          ];
        })
      );
    })
  );

  @Effect()
  updateInvitation$ = this.actions$.pipe(
    ofType(updateInvitationAction),
    switchMap(({form, id}) => {
      return this.invitationService.updateInvitation(id, form).pipe(
        switchMap(() => {
          return [
            updateInvitationSuccessAction()
          ];
        })
      );
    })
  );

  @Effect()
  updateInvitationSuccess$ = this.actions$.pipe(
    ofType(updateInvitationSuccessAction),
    switchMap(() => {
      return [
        navigateToInvitationList()
      ];
    })
  );

  @Effect()
  navigateToInvitationNew$ = this.actions$.pipe(
    ofType(navigateToInvitationCreate),
    switchMap(() => {
      this.router.navigate([
        this.routeNames.Invitation.Entry,
        this.routeNames.Invitation.New,
      ]);

      return [];
    })
  );

  @Effect()
  createInvitation$ = this.actions$.pipe(
    ofType(createInvitationAction),
    switchMap(({form}) => {
      return this.invitationService.createInvitation(form).pipe(
        switchMap(() => {
          return [
            createInvitationSuccessAction()
          ];
        })
      );
    })
  );

  @Effect()
  createInvitationSuccess$ = this.actions$.pipe(
    ofType(createInvitationSuccessAction),
    switchMap(() => {
      return [
        navigateToInvitationList()
      ];
    })
  );

  @Effect()
  deleteInvitation$ = this.actions$.pipe(
    ofType(deleteInvitationAction),
    switchMap(({id}) => {
      return this.invitationService.deleteInvitation(id).pipe(
        switchMap(() => {
          return [
            deleteInvitationSuccessAction()
          ];
        })
      );
    })
  );

  @Effect()
  deleteInvitationSuccess$ = this.actions$.pipe(
    ofType(deleteInvitationSuccessAction),
    switchMap(() => {
      return [
        navigateToInvitationList()
      ];
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
