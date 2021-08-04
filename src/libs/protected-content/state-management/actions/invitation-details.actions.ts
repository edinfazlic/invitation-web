import {createAction, props} from '@ngrx/store';
import {InvitationRequest} from '../../models/dtos/invitation-request.model';
import {InvitationDetails} from '../../models/invitation-details.model';

export const navigateToInvitationDetails = createAction(
  '[Invitation] Navigate to invitation details',
  props<{ invitationId: number }>()
);

export const getInvitationDetailsAction = createAction(
  '[Invitation] Get details',
  props<{ id: number }>()
);

export const getInvitationDetailsSuccessAction = createAction(
  '[Invitation] Get details success',
  props<{ details: InvitationDetails }>()
);

export const updateInvitationAction = createAction(
  '[Invitation] Submit for update',
  props<{ form: InvitationRequest, id: number }>()
);

export const updateInvitationSuccessAction = createAction('[Invitation] Submit for update success');

export const navigateToInvitationCreate = createAction('[Invitation] Navigate to invitation new');

export const createInvitationAction = createAction(
  '[Invitation] Submit for create',
  props<{ form: InvitationRequest }>()
);

export const createInvitationSuccessAction = createAction('[Invitation] Submit for create success');


export const deleteInvitationAction = createAction(
  '[Invitation] Submit for delete',
  props<{ id: number }>()
);

export const deleteInvitationSuccessAction = createAction('[Invitation] Submit for delete success');
