import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationTemplate} from '../../models/invitation-template.model';
import {createInvitationTemplateAction} from '../../state-management/actions/invitation-template-details.actions';
import {navigateToInvitationTemplateList} from '../../state-management/actions/invitation-template-list.actions';

@Component({
  selector: 'app-invitation-template-new',
  templateUrl: './invitation-template-new.component.html',
  styleUrls: ['./invitation-template-new.component.css']
})
export class InvitationTemplateNewComponent {

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  handleFormSubmit(formValue: InvitationTemplate): void {
    this.store.dispatch(createInvitationTemplateAction({
      form: formValue,
    }));
  }

  cancelUpdate() {
    this.store.dispatch(navigateToInvitationTemplateList());
  }

}
