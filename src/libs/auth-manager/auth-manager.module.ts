import {NgModule} from '@angular/core';
import {AuthorizedGuard} from './guards/authorized.guard';
import {SignInService} from './services/sign-in.service';
import {AuthManagerStateModule} from './state-management/auth-manager-state.module';

@NgModule({
  imports: [
    AuthManagerStateModule,
  ],
  providers: [
    AuthorizedGuard,
    SignInService,
  ]
})
export class AuthManagerModule {
}
