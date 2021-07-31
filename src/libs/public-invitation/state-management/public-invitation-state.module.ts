import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {PublicInvitationEffects} from './public-invitation.effects';
import {invitationFeatureKey, reducer} from './public-invitation.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(invitationFeatureKey, reducer),
    EffectsModule.forFeature([
      PublicInvitationEffects,
    ])
  ]
})
export class PublicInvitationStateModule {
}
