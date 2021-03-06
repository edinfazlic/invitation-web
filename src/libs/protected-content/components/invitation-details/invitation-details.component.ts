import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InvitationResponseStatus} from '../../../core/models';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationRequest} from '../../models/dtos/invitation-request.model';
import {InvitationLogType} from '../../models/enums/invitation-log-type.model';
import {InvitationDetails} from '../../models/invitation-details.model';
import {InvitationTemplate} from '../../models/invitation-template.model';
import {deleteInvitationAction, updateInvitationAction} from '../../state-management/actions/invitation-details.actions';
import {navigateToInvitationList} from '../../state-management/actions/invitation-list.actions';
import {getInvitationDetails, getInvitationTemplateList} from '../../state-management/invitation.selectors';

@Component({
  selector: 'app-invitation-details',
  templateUrl: './invitation-details.component.html',
  styleUrls: ['./invitation-details.component.css']
})
export class InvitationDetailsComponent {

  private static readonly ONE_HOUR = 60 * 60 * 1000;
  private static readonly ONE_DAY = 24 * 60 * 60 * 1000;

  invitation$: Observable<InvitationDetails> = this.store.select(getInvitationDetails);
  templates$: Observable<InvitationTemplate[]> = this.store.select(getInvitationTemplateList);

  responseStatus = InvitationResponseStatus;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  handleFormSubmit(formValue: InvitationRequest): void {
    const id = this.route.snapshot.params[this.routeNames.Invitation.Parameter.id];

    this.store.dispatch(updateInvitationAction({
      form: formValue,
      id,
    }));
  }

  cancelUpdate(): void {
    this.store.dispatch(navigateToInvitationList());
  }

  deleteInvitation(invitationId: number): void {
    this.store.dispatch(deleteInvitationAction({id: invitationId}));
  }

  formatDate(stringDate: string): string {
    const date = new Date(stringDate);
    let now = new Date();

    let timeDiff = now.getTime() - date.getTime();
    if (timeDiff < InvitationDetailsComponent.ONE_HOUR) {
      return `Prije ${Math.floor(timeDiff / 60000)} min.`;
    }

    now.setHours(0, 0, 0, 0);
    timeDiff = now.getTime() - date.getTime();
    if (timeDiff < 0) {
      return `Danas u ${date.toLocaleTimeString()}`;
    }

    now = new Date(now.getTime() - InvitationDetailsComponent.ONE_DAY);
    timeDiff = now.getTime() - date.getTime();
    if (timeDiff < 0) {
      return `Ju??er u ${date.toLocaleTimeString()}`;
    }

    return date.toLocaleString();
  }

  getChangeType(responseStatus: InvitationLogType): string {
    switch (responseStatus) {
      case InvitationLogType.INVITATION_CREATED:
        return 'Pozivnica kreirana';
      case InvitationLogType.INVITATION_UPDATED:
        return 'Pozivnica a??urirana';
      case InvitationLogType.INVITATION_DELETED:
        return 'Pozivnica obrisana';
      case InvitationLogType.RESPONSE_CREATED:
        return 'Odgovor poslan';
      case InvitationLogType.RESPONSE_UPDATED:
        return 'Odgovor a??uriran';
      case InvitationLogType.RESPONSE_DELETED:
        return 'Odgovor obrisan';
      case InvitationLogType.VISITED:
        return 'Pozivnica pogledana';
    }
    return 'Doga??aj nije prepoznat';
  }

  getAttribute(attribute: string): string {
    switch (attribute) {
      case ('TEMPLATE'):
        return 'Predlo??ka';
      case ('SUBJECT'):
        return 'Zvanica';
      case ('PARAMETERS'):
        return 'Parametar';
      case ('PEOPLE_AMOUNT'):
        return 'Broj gostiju';
      case ('CHILDREN_AMOUNT'):
        return 'Broj djece';
      case ('NOTE'):
        return 'Zabilje??ka';
      case ('STATUS'):
        return 'Odgovor';
      case ('COMMENT'):
        return 'Komentar';
    }
    return attribute;
  }

  getResponseStatus(responseStatus: InvitationResponseStatus): string {
    switch (responseStatus) {
      case InvitationResponseStatus.YES:
        return 'Da';
      case InvitationResponseStatus.MAYBE:
        return 'Mo??da';
      case InvitationResponseStatus.NO:
        return 'Ne';
    }
    return 'Nema odgovora.';
  }

}
