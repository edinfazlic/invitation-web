import {Provider} from '@angular/core';
import {APP_ENVIRONMENT} from '../constants/invitation-core.tokens';
import {InvitationEnvironment} from '../models/interfaces/invitation.environment';

/**
 * Best practices in Angular are recommend to use constants through InjectionTokens.
 * All environments are provided from parent app to the libs but environment could not be imported from app to libs directly.
 * Next provider is provide APP_ENVIRONMENT Injection Toke with environment for a current app.
 *
 * @param environment - app environment object.
 */
export function provideEnvironment(environment: InvitationEnvironment): Provider[] {
  return ([
    {
      provide: APP_ENVIRONMENT,
      useValue: environment
    }
  ]);
}
