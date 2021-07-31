import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {provideRouteNames, routeNames} from '../core/routes';
import {PublicInvitationContainerComponent} from './components/public-invitation-container/public-invitation-container.component';
import {PublicInvitationGuard} from './guards/public-invitation.guard';

const routes: Routes = [
  {
    path: routeNames.Public.Entry,
    redirectTo: `/${routeNames.Base}`,
    pathMatch: 'full'
  },
  {
    path: `:${routeNames.Public.Parameter.uuid}`,
    component: PublicInvitationContainerComponent,
    canActivate: [PublicInvitationGuard],
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
