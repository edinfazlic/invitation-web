import {NgModule} from '@angular/core';
import {AuthorizedGuard} from './guards/authorized.guard';
import {AuthManagerStateModule} from './state-management/auth-manager-state.module';

@NgModule({
  imports: [
    AuthManagerStateModule,
  ],
  providers: [
    AuthorizedGuard,
  ]
})
export class AuthManagerModule {
}
