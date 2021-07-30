import {InjectionToken} from '@angular/core';

export const routeNames = {
  Entry: '',
  Base: '',

  Login: {
    Entry: 'login',
    Base: '',
  },

  Public: {
    Entry: '',
    Invitation: 'i',
  },

  Invitation: {
    Entry: 'invitation',
    Base: '',
    New: 'new',

    Parameter: {
      id: 'id',
    }
  },

  InvitationTemplate: {
    Entry: 'template',
    Base: '',
    New: 'new',

    Parameter: {
      id: 'id',
    }
  }
};

export type RouteNames = typeof routeNames;

export const ROUTE_NAMES: InjectionToken<RouteNames> = new InjectionToken<RouteNames>(
  'Route Names'
);

export const provideRouteNames = (entry = '') => [
  {
    provide: ROUTE_NAMES,
    useValue: {...routeNames, Entry: entry}
  }
];
