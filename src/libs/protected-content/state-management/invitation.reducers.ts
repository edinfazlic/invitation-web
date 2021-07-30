import {Action, createReducer, on} from '@ngrx/store';
import {InvitationDetails} from '../models/invitation-details.model';
import {InvitationListItem} from '../models/invitation-list-item.model';
import {InvitationTemplate} from '../models/invitation-template.model';
import {getInvitationDetailsSuccessAction} from './actions/invitation-details.actions';
import {getInvitationTemplatesSuccessAction} from './actions/invitation-template-list.actions';
import {getInvitationsSuccessAction, getInvitationTemplateDetailsSuccessAction, setLastUsedTemplateAction} from './invitation.actions';

export const invitationFeatureKey = 'invitation';

export interface InvitationState {
  list?: InvitationListItem[];
  details?: InvitationDetails;
  templates?: InvitationTemplate[];
  templateDetails?: InvitationTemplate;
  lastUsedTemplate?: InvitationTemplate;
}

export const initialState: InvitationState = {
  list: [],
  templates: [],
};

export const invitationReducer = createReducer(
  initialState,

  on(getInvitationsSuccessAction, (state: InvitationState, {items}) => ({...state, list: items})),
  on(getInvitationDetailsSuccessAction, (state: InvitationState, {details}) => ({...state, details})),
  on(getInvitationTemplatesSuccessAction, (state: InvitationState, {items}) => ({...state, templates: items})),
  on(getInvitationTemplateDetailsSuccessAction, (state: InvitationState, {details}) => ({...state, templateDetails: details})),
  on(setLastUsedTemplateAction, (state: InvitationState, {template}) => ({...state, lastUsedTemplate: template})),
);

export const reducer = (state: InvitationState, action: Action): InvitationState => {
  return invitationReducer(state, action);
};
