import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InvitationListItem} from '../../models/invitation-list-item.model';
import {InvitationResponseStatus} from '../../../core/models';
import {navigateToInvitationCreate, navigateToInvitationDetails} from '../../state-management/actions/invitation-details.actions';
import {getInvitationList} from '../../state-management/invitation.selectors';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent {

  invitations$: Observable<InvitationListItem[]> = this.store.select(getInvitationList);

  responseStatus = InvitationResponseStatus;

  constructor(private store: Store) {
  }

  openInvitation(invitationId: number): void {
    this.store.dispatch(navigateToInvitationDetails({invitationId}));
  }

  getResponseStatus(responseStatus: InvitationResponseStatus): string {
    switch (responseStatus) {
      case InvitationResponseStatus.YES:
        return 'Da';
      case InvitationResponseStatus.MAYBE:
        return 'Možda';
      case InvitationResponseStatus.NO:
        return 'Ne';
    }
    return 'Bez odgovora.';
  }

  createInvitation() {
    this.store.dispatch(navigateToInvitationCreate());
  }

  generateLink(uuid: string): string {
    return `https://pozivnica.netlify.app/#/i/${uuid}`;
  }
}
