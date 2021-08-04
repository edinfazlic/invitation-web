import {HTTP_INTERCEPTORS, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Provider} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {hideSpinnerAction, showSpinnerAction} from '../state-management/spinner.actions';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showSpinner();

    return next.handle(req).pipe(
      switchMap((res) => {
        if (res.type !== HttpEventType.Sent) {
          this.hideSpinner();
        }

        return of(res);
      }),
      catchError((err) => {
        this.hideSpinner();

        return throwError(err);
      })
    );
  }

  private showSpinner(): void {
    this.store.dispatch(showSpinnerAction());
  }

  private hideSpinner(): void {
    this.store.dispatch(hideSpinnerAction());
  }
}

export const provideSpinnerInterceptor = (): Provider => [{
  provide: HTTP_INTERCEPTORS,
  useClass: SpinnerInterceptorService,
  multi: true
}];
