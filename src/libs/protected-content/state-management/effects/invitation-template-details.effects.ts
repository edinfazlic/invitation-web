import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationService} from '../../services/invitation.service';
import {
  createInvitationTemplateAction,
  createInvitationTemplateSuccessAction,
  getInvitationTemplateDetailsAction,
  getInvitationTemplateDetailsSuccessAction, navigateToInvitationTemplateCreate,
  navigateToInvitationTemplateDetails,
  updateInvitationTemplateAction,
  updateInvitationTemplateSuccessAction
} from '../actions/invitation-template-details.actions';
import {navigateToInvitationTemplateList} from '../actions/invitation-template-list.actions';

@Injectable()
export class InvitationTemplateDetailsEffects {

  @Effect()
  navigateToInvitationTemplateDetails$ = this.actions$.pipe(
    ofType(navigateToInvitationTemplateDetails),
    switchMap(({id}) => {
      this.router.navigate([
        this.routeNames.InvitationTemplate.Entry,
        id,
      ]);

      return [];
    })
  );

  @Effect()
  fetchInvitationTemplateDetails$ = this.actions$.pipe(
    ofType(getInvitationTemplateDetailsAction),
    switchMap(({id}) => {
      return this.invitationService.getInvitationTemplateDetails(id).pipe(
        switchMap(result => {
          return [
            getInvitationTemplateDetailsSuccessAction({details: result})
          ];
        })
      );
    })
  );

  @Effect()
  updateInvitationTemplate$ = this.actions$.pipe(
    ofType(updateInvitationTemplateAction),
    switchMap(({form}) => {
      return this.invitationService.updateInvitationTemplate(form).pipe(
        switchMap(() => {
          return [
            updateInvitationTemplateSuccessAction()
          ];
        })
      );
    })
  );

  @Effect()
  updateInvitationTemplateSuccess$ = this.actions$.pipe(
    ofType(updateInvitationTemplateSuccessAction),
    switchMap(() => {
      return [
        navigateToInvitationTemplateList()
      ];
    })
  );

  @Effect()
  navigateToInvitationTemplateNew$ = this.actions$.pipe(
    ofType(navigateToInvitationTemplateCreate),
    switchMap(() => {
      this.router.navigate([
        this.routeNames.InvitationTemplate.Entry,
        this.routeNames.InvitationTemplate.New,
      ]);

      return [];
    })
  );

  @Effect()
  createInvitationTemplate$ = this.actions$.pipe(
    ofType(createInvitationTemplateAction),
    switchMap(({form}) => {
      return this.invitationService.createInvitationTemplate(form).pipe(
        switchMap(() => {
          return [
            createInvitationTemplateSuccessAction()
          ];
        })
      );
    })
  );

  @Effect()
  createInvitationTemplateSuccess$ = this.actions$.pipe(
    ofType(createInvitationTemplateSuccessAction),
    switchMap(() => {
      return [
        navigateToInvitationTemplateList()
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
