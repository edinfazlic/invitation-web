import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationRequest} from '../../models/dtos/invitation-request.model';
import {InvitationTemplate} from '../../models/invitation-template.model';
import {createInvitationAction} from '../../state-management/actions/invitation-details.actions';
import {navigateToInvitationList} from '../../state-management/actions/invitation-list.actions';
import {setLastUsedTemplateAction} from '../../state-management/actions/invitation-template-details.actions';
import {getInvitationTemplateList, getLastUsedTemplate} from '../../state-management/invitation.selectors';

@Component({
  selector: 'app-invitation-new',
  templateUrl: './invitation-new.component.html',
  styleUrls: ['./invitation-new.component.css']
})
export class InvitationNewComponent {

  templates$: Observable<InvitationTemplate[]> = this.store.select(getInvitationTemplateList);
  lastUsedTemplate$: Observable<InvitationTemplate> = this.store.select(getLastUsedTemplate);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  handleFormSubmit(formValue: InvitationRequest): void {
    this.store.dispatch(createInvitationAction({
      form: formValue,
    }));
  }

  cancelUpdate() {
    this.store.dispatch(navigateToInvitationList());
  }

  setLastUsedTemplate(template: InvitationTemplate) {
    this.store.dispatch(setLastUsedTemplateAction({template}));
  }
}
