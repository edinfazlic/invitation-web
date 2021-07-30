import {createAction, props} from '@ngrx/store';
import {InvitationListItem} from '../../models/invitation-list-item.model';

export const getInvitationsAction = createAction('[Invitation List] Get list');

export const getInvitationsSuccessAction = createAction(
  '[Invitation List] Get list success',
  props<{ items: InvitationListItem[] }>()
);

export const navigateToInvitationList = createAction('[Invitation List] Navigate to invitation list');
