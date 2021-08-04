import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {provideStorageKey} from '../core';
import {StorageModule} from '../storage';
import {InvitationDetailsComponent} from './components/invitation-details/invitation-details.component';
import {InvitationListComponent} from './components/invitation-list/invitation-list.component';
import {InvitationNewComponent} from './components/invitation-new/invitation-new.component';
import {InvitationTemplateDetailsComponent} from './components/invitation-template-details/invitation-template-details.component';
import {InvitationTemplateListComponent} from './components/invitation-template-list/invitation-template-list.component';
import {InvitationTemplateNewComponent} from './components/invitation-template-new/invitation-template-new.component';
import {LoginComponent} from './components/login/login.component';
import {ProtectedContentWrapperComponent} from './components/protected-content-wrapper/protected-content-wrapper.component';
import {InvitationFormComponent} from './components/simple/invitation-form/invitation-form.component';
import {InvitationTemplateFormComponent} from './components/simple/invitation-template-form/invitation-template-form.component';
import {InvitationDetailsGuard} from './guards/invitation-details.guard';
import {InvitationListGuard} from './guards/invitation-list.guard';
import {InvitationTemplateDetailsGuard} from './guards/invitation-template-details.guard';
import {InvitationTemplateListGuard} from './guards/invitation-template-list.guard';
import {ProtectedContentRoutingModule} from './protected-content-routing.module';
import {InvitationService} from './services/invitation.service';
import {InvitationStateModule} from './state-management/invitation-state.module';

@NgModule({
  declarations: [
    LoginComponent,
    ProtectedContentWrapperComponent,
    InvitationListComponent,
    InvitationDetailsComponent,
    InvitationFormComponent,
    InvitationNewComponent,

    InvitationTemplateListComponent,
    InvitationTemplateDetailsComponent,
    InvitationTemplateFormComponent,
    InvitationTemplateNewComponent,
  ],
  imports: [
    CommonModule,

    StorageModule,

    ProtectedContentRoutingModule,
    InvitationStateModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideStorageKey(),

    InvitationListGuard,
    InvitationService,
    InvitationDetailsGuard,
    InvitationTemplateListGuard,
    InvitationTemplateDetailsGuard,
  ]
})
export class ProtectedContentModule {
}
