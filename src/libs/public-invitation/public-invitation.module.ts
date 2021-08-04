import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PublicInvitationContainerComponent} from './components/public-invitation-container/public-invitation-container.component';
import {PublicInvitationComponent} from './components/simple/public-invitation/public-invitation.component';
import {PublicInvitationGuard} from './guards/public-invitation.guard';
import {PublicInvitationRoutingModule} from './public-invitation-routing.module';
import {PublicInvitationService} from './services/public-invitation.service';
import {PublicInvitationStateModule} from './state-management/public-invitation-state.module';

@NgModule({
  declarations: [
    PublicInvitationContainerComponent,
    PublicInvitationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    PublicInvitationRoutingModule,
    PublicInvitationStateModule,
  ],
  providers: [
    PublicInvitationService,
    PublicInvitationGuard,
  ]
})
export class PublicInvitationModule {
}
