import {InjectionToken} from '@angular/core';
import {InvitationEnvironment} from '../models/interfaces/invitation.environment';

/**
 * URLs for connection with API
 */
export const APP_ENVIRONMENT: InjectionToken<InvitationEnvironment> = new InjectionToken('Environment values');

