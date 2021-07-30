import {createAction, props} from '@ngrx/store';
import {InvitationTemplate} from '../../models/invitation-template.model';

export const navigateToInvitationTemplateDetails = createAction(
  '[Invitation Template] Navigate to invitation template details',
  props<{ id: number }>()
);

export const getInvitationTemplateDetailsAction = createAction(
  '[Invitation Template] Get details',
  props<{ id: number }>()
);

export const getInvitationTemplateDetailsSuccessAction = createAction(
  '[Invitation Template] Get details success',
  props<{ details: InvitationTemplate }>()
);

export const updateInvitationTemplateAction = createAction(
  '[Invitation Template] Submit for update',
  props<{ form: InvitationTemplate }>()
);

export const updateInvitationTemplateSuccessAction = createAction('[Invitation Template] Submit for update success');

export const navigateToInvitationTemplateCreate = createAction('[Invitation Template] Navigate to invitation template new');

export const createInvitationTemplateAction = createAction(
  '[Invitation Template] Submit for create',
  props<{ form: InvitationTemplate }>()
);

export const createInvitationTemplateSuccessAction = createAction('[Invitation Template] Submit for create success');

export const setLastUsedTemplateAction = createAction(
  '[Invitation Template] Set last used template',
  props<{ template: InvitationTemplate }>()
);
