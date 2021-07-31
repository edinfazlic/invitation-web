import {createAction, props} from '@ngrx/store';
import {InvitationResponse} from '../../core/models';
import {PublicInvitation} from '../models/public-invitation.model';

export const getPublicInvitationAction = createAction(
  '[Public Invitation] Get details',
  props<{ id: string }>()
);

export const getPublicInvitationSuccessAction = createAction(
  '[Public Invitation] Get details success',
  props<{ details: PublicInvitation }>()
);

export const sendInvitationResponseAction = createAction(
  '[Public Invitation] Send response',
  props<{ response: InvitationResponse, invitationId: number }>()
);

export const sendInvitationResponseSuccessAction = createAction('[Public Invitation] Send response success');
