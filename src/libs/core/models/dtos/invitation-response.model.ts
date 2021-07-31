import {InvitationResponseStatus} from '../enums/invitation-response-status.model';

export interface InvitationResponse {
  status: InvitationResponseStatus;
  comment: string;
}
