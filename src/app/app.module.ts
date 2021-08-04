import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {AuthManagerModule, provideAuthorizationInterceptor} from '../libs/auth-manager';
import {provideEnvironment} from '../libs/core';
import {SpinnerModule} from '../libs/spinner/spinner.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    AuthManagerModule,
    SpinnerModule,

    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideAuthorizationInterceptor(),
    provideEnvironment(environment),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
