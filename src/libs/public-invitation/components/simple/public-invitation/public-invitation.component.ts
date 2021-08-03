import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvitationResponse, InvitationResponseStatus} from '../../../../core/models';
import {PublicInvitation} from '../../../models/public-invitation.model';

@Component({
  selector: 'app-public-invitation',
  templateUrl: './public-invitation.component.html',
  styleUrls: ['./public-invitation.component.css']
})
export class PublicInvitationComponent implements OnInit {

  private readonly countdownDueDate = 'Aug 28, 2021 18:00:00';
  private readonly responseDueDate = 'Aug 18, 2021 23:59:59';

  @Input()
  set invitationModel(invitation: PublicInvitation) {
    this.invitation = {...invitation};

    this.provideAnswerSectionHidden = !!this.invitation.response;
    this.comment = this.invitation.response?.comment;
  }

  invitation: PublicInvitation;
  comment: string;

  @Output()
  sendResponse: EventEmitter<{ response: InvitationResponse, id: number }> =
    new EventEmitter<{ response: InvitationResponse, id: number }>();

  provideAnswerSectionHidden: boolean;
  provideAnswerLocked = false;
  isShowMap = false;
  timerText: string;

  responseStatus = InvitationResponseStatus;

  ngOnInit() {
    this.setCountdownTimer();
    this.provideAnswerLocked = new Date().getTime() > new Date(this.responseDueDate).getTime();
  }

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

  changeAnswer(): void {
    this.provideAnswerSectionHidden = false;
  }

  getProvideAnswerHint(): string {
    if (!!this.invitation.response) {
      if (this.invitation.response.status === InvitationResponseStatus.NO) {
        return 'Javili ste nam da nažalost ';
      } else {
        return 'Drago nam je što ste javili da ';
      }
    }
    return 'Molimo vas da svoj dolazak potvrdite do 18.8.';
  }

  getNoButtonTitle(): string {
    return !this.invitation.response ? 'Ne dolazimo' : 'Ipak ne dolazimo';
  }

  getYesButtonTitle(): string {
    return !this.invitation.response ? 'Dolazimo' : 'Ipak dolazimo';
  }

  private setCountdownTimer(): void {
    const countDownDate = new Date(this.countdownDueDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timerText = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      if (distance < 0) {
        clearInterval(interval);
        this.timerText = '';
      }
    }, 1000);
  }

  showMap(): void {
    this.isShowMap = true;
  }

  showTimer(): boolean {
    return this.invitation.response?.status === InvitationResponseStatus.YES && !!this.timerText;
  }
}
