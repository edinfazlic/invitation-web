import {createSelector} from '@ngrx/store';
import {InvitationListItem} from '../models/invitation-list-item.model';
import {invitationFeatureKey, InvitationState} from './invitation.reducers';

export const getInvitationState: (state: InvitationState) => any =
  (state: InvitationState) => state[invitationFeatureKey];

export const getInvitationList = createSelector(
  getInvitationState,
  (state: InvitationState): InvitationListItem[] => state.list
);
