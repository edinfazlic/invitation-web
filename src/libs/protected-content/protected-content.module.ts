import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {AuthManagerModule, provideAuthorizationInterceptor} from '../auth-manager';
import {provideStorageKey} from '../core';
import {StorageModule} from '../storage';
import {InvitationListComponent} from './components/invitation-list/invitation-list.component';
import {LoginComponent} from './components/login/login.component';
import {ProtectedContentRoutingModule} from './protected-content-routing.module';
import {InvitationListResolver} from './resolvers/invitation-list.resolver';
import {InvitationService} from './services/invitation.service';
import {InvitationStateModule} from './state-management/invitation-state.module';

@NgModule({
  declarations: [
    LoginComponent,
    InvitationListComponent
  ],
  imports: [
    HttpClientModule,

    StorageModule,

    ProtectedContentRoutingModule,
    AuthManagerModule,
    InvitationStateModule,
  ],
  providers: [
    provideAuthorizationInterceptor(),
    provideStorageKey(),

    InvitationListResolver,
    InvitationService,
  ]
})
export class ProtectedContentModule {
}
