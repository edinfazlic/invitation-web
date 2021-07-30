import {HttpBackend, HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_ENVIRONMENT, InvitationEnvironment} from '../../core';
import {AuthResponse} from '../models/interfaces/auth-response.interface';
import {SignInForm} from '../models/interfaces/sign-in-form.interface';

@Injectable()
export class SignInService {

  private http: HttpClient;

  constructor(
    handler: HttpBackend,
    @Inject(APP_ENVIRONMENT) private environment: InvitationEnvironment
  ) {
    this.http = new HttpClient(handler);
  }

  logIn(signInForm: SignInForm): Observable<AuthResponse> {
    const body = {
      username: signInForm.email,
      password: signInForm.password,
    };

    return this.http.post<AuthResponse>(`${this.environment.backend}/authenticate`, body);
  }

}
