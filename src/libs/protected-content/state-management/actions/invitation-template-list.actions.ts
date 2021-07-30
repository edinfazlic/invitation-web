import {createAction, props} from '@ngrx/store';
import {InvitationTemplate} from '../../models/invitation-template.model';

export const getInvitationTemplatesAction = createAction('[Invitation Template List] Get Template list');

export const getInvitationTemplatesSuccessAction = createAction(
  '[Invitation Template List] Get list success',
  props<{ items: InvitationTemplate[] }>()
);

export const navigateToInvitationTemplateList = createAction('[Invitation Template List] Navigate to invitation template list');
