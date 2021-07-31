import {InvitationLogItem} from './invitation-log-item.model';
import {InvitationResponse} from '../../core/models';
import {InvitationTemplate} from './invitation-template.model';

export interface InvitationDetails {
  id: number;
  uuid?: string;
  subject: string;
  parameters: string;
  peopleAmount: number;
  childrenAmount: number;
  note: string;

  response?: InvitationResponse;
  template?: InvitationTemplate;
  logs?: InvitationLogItem[];
}
