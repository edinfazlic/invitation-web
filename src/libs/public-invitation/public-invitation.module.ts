import {NgModule} from '@angular/core';
import {PublicInvitationComponent} from './components/invitation-list/public-invitation.component';
import {PublicInvitationRoutingModule} from './public-invitation-routing.module';

@NgModule({
  declarations: [
    PublicInvitationComponent
  ],
  imports: [
    PublicInvitationRoutingModule,
  ],
})
export class PublicInvitationModule {
}
