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

  provideAnswerSectionHidden: boolean;
  provideAnswerClosed: boolean;
  isCommentVisible: boolean;
  invitation: PublicInvitation;
  comment: string;

  @Output()
  sendResponse: EventEmitter<{ response: InvitationResponse, id: number }> =
    new EventEmitter<{ response: InvitationResponse, id: number }>();

  timerText: string;

  responseStatus = InvitationResponseStatus;

  ngOnInit() {
    this.setCountdownTimer();
    this.provideAnswerClosed = new Date().getTime() > new Date(this.responseDueDate).getTime();
    this.init();
  }

  private init(): void {
    this.provideAnswerSectionHidden = !!this.invitation.response;
    this.isCommentVisible = false;
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

  getProvideAnswerHint(): string {
    if (!!this.invitation.response) {
      if (this.invitation.response.status === InvitationResponseStatus.NO) {
        return this.invitation.plural
          ? 'Javili ste nam da nažalost '
          : 'Žao nam je što je tvoj odgovor da ';
      } else {
        return this.invitation.plural
          ? 'Drago nam je što ste javili da '
          : 'Drago nam je što je tvoj odgovor da ';
      }
    }
    return this.invitation.plural
      ? 'Molimo vas da svoj dolazak potvrdite do 18.8.'
      : 'Molimo te da svoj dolazak potvrdiš do 18.8.';
  }

  getAnswerYesHint(): string {
    return this.invitation.plural ? 'ćete doći.' : 'ćeš doći.';
  }

  getAnswerNoHint(): string {
    return this.invitation.plural ? 'nećete moći doći.' : 'nećeš moći doći.';
  }

  showTimer(): boolean {
    return this.invitation.response?.status === InvitationResponseStatus.YES && !!this.timerText;
  }

  isSendCommentQuestionVisible(): boolean {
    return !!this.invitation.response;
  }

  showComment(): void {
    this.isCommentVisible = true;
  }

  sendComment(): void {
    this.emitSendResponse({
      status: this.invitation.response.status,
      comment: this.comment,
    });
  }

  isChangeAnswerQuestionVisible(): boolean {
    return !this.provideAnswerClosed && !!this.invitation.response;
  }

  changeAnswer(): void {
    this.provideAnswerSectionHidden = false;
  }

  isAnswerSectionVisible(): boolean {
    return !this.provideAnswerClosed && !this.provideAnswerSectionHidden;
  }

  declineInvitation() {
    this.sendStatus(InvitationResponseStatus.NO);
  }

  confirmInvitation() {
    this.sendStatus(InvitationResponseStatus.YES);
  }

  private sendStatus(status: InvitationResponseStatus): void {
    this.emitSendResponse({
      status,
      comment: this.invitation.response?.comment,
    });
  }

  private emitSendResponse(response: InvitationResponse): void {
    this.sendResponse.emit({
      response,
      id: this.invitation.id,
    });
    this.init();
  }

  getNoButtonTitle(): string {
    if (!this.invitation.response) {
      return this.invitation.plural ? 'Ne dolazimo' : 'Ne dolazim';
    } else {
      return this.invitation.plural ? 'Ipak ne dolazimo' : 'Ipak ne dolazim';
    }
  }

  getYesButtonTitle(): string {
    if (!this.invitation.response) {
      return this.invitation.plural ? 'Dolazimo' : 'Dolazim';
    } else {
      return this.invitation.plural ? 'Ipak dolazimo' : 'Ipak dolazim';
    }
  }

  showMap(): void {
    window.location.href = 'https://goo.gl/maps/8h1pxqggWKbgsGTC7';
  }
}
