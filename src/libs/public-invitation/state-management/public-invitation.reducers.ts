import {Action, createReducer, on} from '@ngrx/store';
import {PublicInvitation} from '../models/public-invitation.model';
import {getPublicInvitationSuccessAction} from './public-invitation.actions';

export const invitationFeatureKey = 'public-invitation';

export interface PublicInvitationState {
  invitation?: PublicInvitation;
}

export const initialState: PublicInvitationState = {};

export const invitationReducer = createReducer(
  initialState,

  on(getPublicInvitationSuccessAction, (state: PublicInvitationState, {details}) => ({...state, invitation: details})),
);

export const reducer = (state: PublicInvitationState, action: Action): PublicInvitationState => {
  return invitationReducer(state, action);
};
