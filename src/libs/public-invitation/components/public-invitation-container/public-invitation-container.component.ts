import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InvitationResponse} from '../../../core/models';
import {PublicInvitation} from '../../models/public-invitation.model';
import {sendInvitationResponseAction} from '../../state-management/public-invitation.actions';
import {getPublicInvitationDetails} from '../../state-management/public-invitation.selectors';

@Component({
  selector: 'app-public-invitation-container',
  templateUrl: './public-invitation-container.component.html',
  styleUrls: ['./public-invitation-container.component.css']
})
export class PublicInvitationContainerComponent {

  invitation$: Observable<PublicInvitation> = this.store.select(getPublicInvitationDetails);

  constructor(
    private store: Store,
  ) {
  }

  sendResponse(responseObject: { response: InvitationResponse, id: number }): void {
    this.store.dispatch(sendInvitationResponseAction({
      response: responseObject.response,
      invitationId: responseObject.id,
    }));
  }

}
