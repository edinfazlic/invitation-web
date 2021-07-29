import {createAction, props} from '@ngrx/store';
import {InvitationListItem} from '../../models/invitation-list-item.model';

export const getInvitationsAction = createAction('[Invitation] Get list');

export const getInvitationsSuccessAction = createAction(
  '[Invitation] Get list success',
  props<{ items: InvitationListItem[] }>()
);
