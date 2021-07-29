import {InjectionToken} from '@angular/core';

export const routeNames = {
  Entry: '',
  Base: '',

  Login: {
    Entry: '',
    Base: 'login',
  },

  Public: {
    Entry: '',
    Invitation: 'i',
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
