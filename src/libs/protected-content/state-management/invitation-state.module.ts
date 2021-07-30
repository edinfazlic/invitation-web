import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {InvitationDetailsEffects} from './effects/invitation-details.effects';
import {InvitationListEffects} from './effects/invitation-list.effects';
import {InvitationTemplateDetailsEffects} from './effects/invitation-template-details.effects';
import {InvitationTemplateListEffects} from './effects/invitation-template-list.effects';
import {invitationFeatureKey, reducer} from './invitation.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(invitationFeatureKey, reducer),
    EffectsModule.forFeature([
      InvitationListEffects,
      InvitationDetailsEffects,
      InvitationTemplateListEffects,
      InvitationTemplateDetailsEffects,
    ])
  ]
})
export class InvitationStateModule {
}
