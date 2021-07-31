import {InvitationResponseStatus} from '../../core/models';

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
