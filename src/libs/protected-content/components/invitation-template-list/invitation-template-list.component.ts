import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {InvitationTemplate} from '../../models/invitation-template.model';
import {
  navigateToInvitationTemplateCreate,
  navigateToInvitationTemplateDetails
} from '../../state-management/actions/invitation-template-details.actions';
import {getInvitationTemplateList} from '../../state-management/invitation.selectors';

@Component({
  selector: 'app-invitation-template-list',
  templateUrl: './invitation-template-list.component.html',
  styleUrls: ['./invitation-template-list.component.css']
})
export class InvitationTemplateListComponent {

  templates$: Observable<InvitationTemplate[]> = this.store.select(getInvitationTemplateList);

  constructor(private store: Store) {
  }

  openTemplate(id: number): void {
    this.store.dispatch(navigateToInvitationTemplateDetails({id}));
  }

  createInvitationTemplate() {
    this.store.dispatch(navigateToInvitationTemplateCreate());
  }
}
