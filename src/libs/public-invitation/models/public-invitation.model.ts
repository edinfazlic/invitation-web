import {InvitationResponse} from '../../core/models';

export interface PublicInvitation {
  id: number;
  uuid: string;
  subject: string;
  parameters: string;
  templateText: string;

  response?: InvitationResponse;
}
