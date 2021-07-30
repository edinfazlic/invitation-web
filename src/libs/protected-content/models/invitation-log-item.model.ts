import {ChangeItem} from './change-item.model';
import {InvitationLogType} from './enums/invitation-log-type.model';

export interface InvitationLogItem {
  date: string;
  logType: InvitationLogType;
  changes: ChangeItem[];
}
