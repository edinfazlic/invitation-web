import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_ENVIRONMENT, InvitationEnvironment} from '../../core';
import {InvitationResponse} from '../../core/models';
import {PublicInvitation} from '../models/public-invitation.model';

@Injectable({
  providedIn: 'root'
})
export class PublicInvitationService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private environment: InvitationEnvironment
  ) {
  }

  getPublicInvitation(uuid: string): Observable<PublicInvitation> {
    return this.http.get<PublicInvitation>(`${this.environment.backend}/invitation/public/${uuid}`);
  }

  sendPublicInvitationResponse(id: number, response: InvitationResponse): Observable<void> {
    return this.http.post<void>(`${this.environment.backend}/invitation/public/${id}/response`, response);
  }

}
