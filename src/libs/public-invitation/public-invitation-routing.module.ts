import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {provideRouteNames, routeNames} from '../core/routes';
import {PublicInvitationComponent} from './components/invitation-list/public-invitation.component';

const routes: Routes = [
  {
    path: routeNames.Public.Entry,
    redirectTo: `/${routeNames.Base}`,
    pathMatch: 'full'
  },
  {
    path: ':uuid',
    component: PublicInvitationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    provideRouteNames(),
  ],
  exports: [RouterModule]
})
export class PublicInvitationRoutingModule {
}
