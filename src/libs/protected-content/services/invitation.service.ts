import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_ENVIRONMENT, InvitationEnvironment} from '../../core';
import {InvitationListItem} from '../models/invitation-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private environment: InvitationEnvironment
  ) {
  }

  getInvitationList(): Observable<InvitationListItem[]> {
    return this.http.get<InvitationListItem[]>(`${this.environment.backend}/invitation`);
  }

}
