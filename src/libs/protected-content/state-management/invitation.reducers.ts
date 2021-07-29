import {Action, createReducer, on} from '@ngrx/store';
import {InvitationListItem} from '../models/invitation-list-item.model';
import {getInvitationsSuccessAction} from './invitation.actions';

export const invitationFeatureKey = 'invitation';

export interface InvitationState {
  list?: InvitationListItem[];
  details?: any; // todo
}

export const initialState: InvitationState = {
  list: [],
};

export const invitationReducer = createReducer(
  initialState,

  on(getInvitationsSuccessAction, (state: InvitationState, {items}) => ({...state, list: items}))
);

export const reducer = (state: InvitationState, action: Action): InvitationState => {
  return invitationReducer(state, action);
};
