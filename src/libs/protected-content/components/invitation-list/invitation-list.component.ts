import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InvitationResponseStatus} from '../../../core/models';
import {InvitationListItem} from '../../models/invitation-list-item.model';
import {navigateToInvitationCreate, navigateToInvitationDetails} from '../../state-management/actions/invitation-details.actions';
import {getInvitationList} from '../../state-management/invitation.selectors';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {
  invitations$: Observable<InvitationListItem[]> = this.store.select(getInvitationList);

  responseStatus = InvitationResponseStatus;

  totalPeople = 0;
  totalChildren = 0;
  missingAnswerPeople = 0;
  missingAnswerChildren = 0;
  yesAnswerPeople = 0;
  yesAnswerChildren = 0;
  noAnswerPeople = 0;
  noAnswerChildren = 0;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.invitations$.subscribe((invitations) => {
      for (const invitation of invitations) {
        this.totalPeople += invitation.peopleAmount;
        this.totalChildren += invitation.childrenAmount;
        if (invitation.responseStatus === InvitationResponseStatus.YES) {
          this.yesAnswerPeople += invitation.peopleAmount;
          this.yesAnswerChildren += invitation.childrenAmount;
        } else if (invitation.responseStatus === InvitationResponseStatus.NO) {
          this.noAnswerPeople += invitation.peopleAmount;
          this.noAnswerChildren += invitation.childrenAmount;
        } else if (!invitation.responseStatus) {
          this.missingAnswerPeople += invitation.peopleAmount;
          this.missingAnswerChildren += invitation.childrenAmount;
        }
      }
    });
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
    return `${window.location.origin}/#/i/${uuid}`;
  }
}
