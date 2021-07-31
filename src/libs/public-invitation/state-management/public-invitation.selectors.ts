import {createSelector} from '@ngrx/store';
import {PublicInvitation} from '../models/public-invitation.model';
import {invitationFeatureKey, PublicInvitationState} from './public-invitation.reducers';

export const getPublicInvitationState: (state: PublicInvitationState) => any =
  (state: PublicInvitationState) => state[invitationFeatureKey];

export const getPublicInvitationDetails = createSelector(
  getPublicInvitationState,
  (state: PublicInvitationState): PublicInvitation => state.invitation
);
