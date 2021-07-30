import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_ENVIRONMENT, InvitationEnvironment} from '../../core';
import {InvitationRequest} from '../models/dtos/invitation-request.model';
import {InvitationDetails} from '../models/invitation-details.model';
import {InvitationListItem} from '../models/invitation-list-item.model';
import {InvitationTemplate} from '../models/invitation-template.model';

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

  getInvitationDetails(invitationId: number): Observable<InvitationDetails> {
    return this.http.get<InvitationDetails>(`${this.environment.backend}/invitation/${invitationId}`);
  }

  updateInvitation(id: number, formValue: InvitationRequest): Observable<void> {
    return this.http.put<void>(`${this.environment.backend}/invitation/${id}`, formValue);
  }

  createInvitation(formValue: InvitationRequest): Observable<void> {
    return this.http.post<void>(`${this.environment.backend}/invitation`, formValue);
  }


  getInvitationTemplateList(): Observable<InvitationTemplate[]> {
    return this.http.get<InvitationTemplate[]>(`${this.environment.backend}/invitation-template`);
  }

  getInvitationTemplateDetails(id: number): Observable<InvitationTemplate> {
    return this.http.get<InvitationTemplate>(`${this.environment.backend}/invitation-template/${id}`);
  }

  updateInvitationTemplate(formValue: InvitationTemplate): Observable<void> {
    return this.http.put<void>(`${this.environment.backend}/invitation-template/${formValue.id}`, formValue);
  }

  createInvitationTemplate(formValue: InvitationTemplate): Observable<void> {
    return this.http.post<void>(`${this.environment.backend}/invitation-template`, formValue);
  }

}
