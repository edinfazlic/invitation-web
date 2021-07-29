import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Provider} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, throwError} from 'rxjs';
import {catchError, mergeMap, take} from 'rxjs/operators';
import {navigateToSignInPage} from '../state-management/actions/redirect.actions';
import {selectAccessToken} from '../state-management/auth-manager.selectors';

export const provideAuthorizationInterceptor = (): Provider => [{
  provide: HTTP_INTERCEPTORS,
  useClass: class implements HttpInterceptor {
    constructor(
      private store: Store,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.store.pipe(
        select(selectAccessToken),
        take(1),
        mergeMap((token) => {
          if (!token) {
            return next.handle(req);
          }

          const clone = req.clone({
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`
            })
          });

          return next.handle(clone).pipe(
            catchError((err) => {
              if (err.status === 401) {
                this.store.dispatch(navigateToSignInPage());
                // this.store.dispatch(renewTokenAction());
                //
                // return this.actions$.pipe(
                //   ofType(renewTokenSuccessAction),
                //   switchMap(({accessToken}) => {
                //     const requestWithUpdatedToken = req.clone({
                //       headers: new HttpHeaders({
                //         Authorization: `Bearer ${accessToken}`
                //       })
                //     });
                //
                //     return next.handle(requestWithUpdatedToken);
                //   }),
                // );
              }

              return throwError(err);
            })
          );
        })
      );
    }
  },
  multi: true,
  deps: [Store]
}];
