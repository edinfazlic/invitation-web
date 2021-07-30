import {createSelector} from '@ngrx/store';
import {InvitationDetails} from '../models/invitation-details.model';
import {InvitationListItem} from '../models/invitation-list-item.model';
import {InvitationTemplate} from '../models/invitation-template.model';
import {invitationFeatureKey, InvitationState} from './invitation.reducers';

export const getInvitationState: (state: InvitationState) => any =
  (state: InvitationState) => state[invitationFeatureKey];

export const getInvitationList = createSelector(
  getInvitationState,
  (state: InvitationState): InvitationListItem[] => state.list
);

export const getInvitationDetails = createSelector(
  getInvitationState,
  (state: InvitationState): InvitationDetails => state.details
);

export const getInvitationTemplateList = createSelector(
  getInvitationState,
  (state: InvitationState): InvitationTemplate[] => state.templates
);

export const getInvitationTemplateDetails = createSelector(
  getInvitationState,
  (state: InvitationState): InvitationTemplate => state.templateDetails
);

export const getLastUsedTemplate = createSelector(
  getInvitationState,
  (state: InvitationState): InvitationTemplate => state.lastUsedTemplate
);
