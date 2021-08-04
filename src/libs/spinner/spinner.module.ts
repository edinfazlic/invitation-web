import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {provideSpinnerInterceptor} from './interceptors/spinner.interceptor';
import {SpinnerStateModule} from './state-management/spinner-state.module';

@NgModule({
  imports: [
    CommonModule,
    SpinnerStateModule
  ],
  declarations: [
    SpinnerComponent
  ],
  providers: [
    provideSpinnerInterceptor(),
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule {
}
