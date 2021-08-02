import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InvitationRequest} from '../../../models/dtos/invitation-request.model';
import {InvitationDetails} from '../../../models/invitation-details.model';
import {InvitationTemplate} from '../../../models/invitation-template.model';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.css']
})
export class InvitationFormComponent implements OnInit {

  invitation: InvitationDetails = {
    id: null,
    uuid: null,
    subject: '',
    parameters: '',
    peopleAmount: 0,
    childrenAmount: 0,
    note: '',
  };

  selectedTemplate: InvitationTemplate = {
    id: null,
    name: 'Odaberi predlošku',
    text: '',
  };

  @Input()
  set invitationDetails(invitation: InvitationDetails) {
    this.invitation = invitation;
    this.selectedTemplate = invitation.template;
  }

  @Input()
  templates: InvitationTemplate[] = [];

  @Input()
  set initialTemplate(template: InvitationTemplate) {
    if (!!template) {
      this.selectedTemplate = template;
    }
  }

  @Output()
  submitForm: EventEmitter<InvitationRequest> = new EventEmitter<InvitationRequest>();

  @Output()
  cancelForm: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  templateSelected: EventEmitter<InvitationTemplate> = new EventEmitter<InvitationTemplate>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: [this.invitation?.subject, [Validators.required]],
      peopleAmount: [this.invitation?.peopleAmount || 0, [Validators.required]],
      childrenAmount: [this.invitation?.childrenAmount || 0, [Validators.required]],
      note: [this.invitation?.note, []],
    });
  }

  handleFormSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitForm.emit({
        ...this.form.value,
        parameters: this.form.value.subject,
        invitationTemplateId: this.selectedTemplate.id,
      });
    }
  }

  cancelUpdate() {
    this.cancelForm.emit();
  }

  selectTemplate(template: InvitationTemplate): void {
    this.selectedTemplate = template;
    this.templateSelected.emit(template);
  }

  generateLink(): string {
    return `https://pozivnica.netlify.app/#/i/${this.invitation.uuid}`;
  }
}
