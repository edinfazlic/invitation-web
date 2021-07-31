import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InvitationResponse, InvitationResponseStatus} from '../../../../core/models';
import {PublicInvitation} from '../../../models/public-invitation.model';

@Component({
  selector: 'app-public-invitation',
  templateUrl: './public-invitation.component.html',
  styleUrls: ['./public-invitation.component.css']
})
export class PublicInvitationComponent {

  @Input()
  set invitationModel(invitation: PublicInvitation) {
    this.invitation = {...invitation};


    // todo remove
    // this.invitation.response = {
    //   status: this.responseStatus.NO,
    //   comment: '',
    // };

    this.provideAnswerLocked = !!this.invitation.response;
    this.comment = this.invitation.response?.comment;
  }

  invitation: PublicInvitation;
  comment: string;

  @Output()
  sendResponse: EventEmitter<{ response: InvitationResponse, id: number }> =
    new EventEmitter<{ response: InvitationResponse, id: number }>();

  provideAnswerLocked: boolean;

  responseStatus = InvitationResponseStatus;

  getIntro(): string {
    return this.invitation.templateText.split('%%')[0];
  }

  getInvitationText(): string {
    const sections = this.invitation.templateText.split('%%');
    return sections.length > 1 ? sections[1] : '';
  }

  confirmInvitation() {
    this.emitSendResponse(InvitationResponseStatus.YES);
  }

  declineInvitation() {
    this.emitSendResponse(InvitationResponseStatus.NO);
  }

  private emitSendResponse(status: InvitationResponseStatus): void {
    this.sendResponse.emit({
      response: {
        status,
        comment: this.comment,
      },
      id: this.invitation.id,
    });
  }

  changeAnswer() {
    this.provideAnswerLocked = false;
  }

  getProvideAnswerHint(): string {
    if (!!this.invitation.response) {
      return 'Javili ste nam da ';
    }
    return 'Javite nam';
  }

  getNoButtonTitle(): string {
    return !this.invitation.response ? 'Ne dolazimo' : 'Ipak ne dolazimo';
  }

  getYesButtonTitle(): string {
    return !this.invitation.response ? 'Dolazimo' : 'Ipak dolazimo';
  }
}
