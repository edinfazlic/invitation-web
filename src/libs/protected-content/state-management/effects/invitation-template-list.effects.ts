import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationService} from '../../services/invitation.service';
import {
  getInvitationTemplatesAction,
  getInvitationTemplatesSuccessAction,
  navigateToInvitationTemplateList
} from '../actions/invitation-template-list.actions';

@Injectable()
export class InvitationTemplateListEffects {

  @Effect()
  fetchInvitationTemplateList$ = this.actions$.pipe(
    ofType(getInvitationTemplatesAction),
    switchMap(() => {
      return this.invitationService.getInvitationTemplateList().pipe(
        switchMap(result => {
          return [
            getInvitationTemplatesSuccessAction({items: result})
          ];
        })
      );
    })
  );

  @Effect()
  navigateToInvitationTemplateList$ = this.actions$.pipe(
    ofType(navigateToInvitationTemplateList),
    switchMap(() => {
      this.router.navigate([
        this.routeNames.InvitationTemplate.Entry,
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
