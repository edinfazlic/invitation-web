import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {InvitationListEffects} from './effects/invitation-list.effects';
import {invitationFeatureKey, reducer} from './invitation.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(invitationFeatureKey, reducer),
    EffectsModule.forFeature([InvitationListEffects])
  ]
})
export class InvitationStateModule {
}
