import {InvitationResponseStatus} from './invitation-response-status.model';

export interface InvitationListItem {

  invitationId: number;
  subject: string;
  peopleAmount: number;
  childrenAmount: number;
  responseStatus: InvitationResponseStatus;
  comment: string;
  note: string;
  uuid: string;
}
