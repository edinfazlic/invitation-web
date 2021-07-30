import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizedGuard} from '../auth-manager';
import {provideRouteNames, routeNames} from '../core/routes';
import {InvitationDetailsComponent} from './components/invitation-details/invitation-details.component';
import {InvitationListComponent} from './components/invitation-list/invitation-list.component';
import {InvitationNewComponent} from './components/invitation-new/invitation-new.component';
import {InvitationTemplateDetailsComponent} from './components/invitation-template-details/invitation-template-details.component';
import {InvitationTemplateListComponent} from './components/invitation-template-list/invitation-template-list.component';
import {InvitationTemplateNewComponent} from './components/invitation-template-new/invitation-template-new.component';
import {LoginComponent} from './components/login/login.component';
import {ProtectedContentWrapperComponent} from './components/protected-content-wrapper/protected-content-wrapper.component';
import {InvitationDetailsGuard} from './guards/invitation-details.guard';
import {InvitationListGuard} from './guards/invitation-list.guard';
import {InvitationTemplateDetailsGuard} from './guards/invitation-template-details.guard';
import {InvitationTemplateListGuard} from './guards/invitation-template-list.guard';

const routes: Routes = [
  {
    path: routeNames.Base,
    redirectTo: routeNames.Invitation.Entry,
    pathMatch: 'full'
  },
  {
    path: routeNames.Base,
    component: ProtectedContentWrapperComponent,
    canActivateChild: [AuthorizedGuard],
    children: [
      {
        path: routeNames.Invitation.Entry,
        children: [
          {
            path: routeNames.Invitation.Base,
            component: InvitationListComponent,
            canActivate: [InvitationListGuard],
          },
          {
            path: routeNames.Invitation.New,
            component: InvitationNewComponent,
            canActivate: [InvitationTemplateListGuard],
          },
          {
            path: `:${routeNames.Invitation.Parameter.id}`,
            component: InvitationDetailsComponent,
            canActivate: [InvitationDetailsGuard, InvitationTemplateListGuard],
          },
        ]
      },
      {
        path: routeNames.InvitationTemplate.Entry,
        children: [
          {
            path: routeNames.InvitationTemplate.Base,
            component: InvitationTemplateListComponent,
            canActivate: [InvitationTemplateListGuard],
          },
          {
            path: routeNames.InvitationTemplate.New,
            component: InvitationTemplateNewComponent,
          },
          {
            path: `:${routeNames.InvitationTemplate.Parameter.id}`,
            component: InvitationTemplateDetailsComponent,
            canActivate: [InvitationTemplateDetailsGuard],
          },
        ]
      },
    ]
  },
  {
    path: routeNames.Login.Entry,
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
