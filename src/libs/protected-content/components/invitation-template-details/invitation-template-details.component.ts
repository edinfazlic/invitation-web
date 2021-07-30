import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ROUTE_NAMES, RouteNames} from '../../../core/routes';
import {InvitationTemplate} from '../../models/invitation-template.model';
import {updateInvitationTemplateAction} from '../../state-management/actions/invitation-template-details.actions';
import {navigateToInvitationTemplateList} from '../../state-management/actions/invitation-template-list.actions';
import {getInvitationTemplateDetails} from '../../state-management/invitation.selectors';

@Component({
  selector: 'app-invitation-template-details',
  templateUrl: './invitation-template-details.component.html',
  styleUrls: ['./invitation-template-details.component.css']
})
export class InvitationTemplateDetailsComponent {

  template$: Observable<InvitationTemplate> = this.store.select(getInvitationTemplateDetails);

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    @Inject(ROUTE_NAMES) private routeNames: RouteNames,
  ) {
  }

  handleFormSubmit(formValue: InvitationTemplate): void {
    const id = this.route.snapshot.params[this.routeNames.InvitationTemplate.Parameter.id];

    this.store.dispatch(updateInvitationTemplateAction({
      form: {...formValue, id},
    }));
  }

  cancelUpdate() {
    this.store.dispatch(navigateToInvitationTemplateList());
  }

}
