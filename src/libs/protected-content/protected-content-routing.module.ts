import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvitationListComponent} from './components/invitation-list/invitation-list.component';
import {LoginComponent} from './components/login/login.component';
import {InvitationListResolver} from './resolvers/invitation-list.resolver';
import {AuthorizedGuard} from '../auth-manager';
import {provideRouteNames, routeNames} from '../core/routes';

const routes: Routes = [
  {
    path: routeNames.Base,
    component: InvitationListComponent,
    canActivate: [AuthorizedGuard],
    resolve: {accountants: InvitationListResolver},
  },
  {
    path: routeNames.Login.Base,
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    provideRouteNames(),
  ],
  exports: [RouterModule]
})
export class ProtectedContentRoutingModule {
}
