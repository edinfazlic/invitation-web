import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InvitationTemplate} from '../../../models/invitation-template.model';

@Component({
  selector: 'app-invitation-template-form',
  templateUrl: './invitation-template-form.component.html',
  styleUrls: ['./invitation-template-form.component.css']
})
export class InvitationTemplateFormComponent implements OnInit {

  @Input()
  template: InvitationTemplate = {
    id: null,
    name: '',
    text: '',
  };

  @Output()
  submitForm: EventEmitter<InvitationTemplate> = new EventEmitter<InvitationTemplate>();

  @Output()
  cancelForm: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.template?.name, [Validators.required]],
      text: [this.template?.text, []],
    });
  }

  handleFormSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  cancelUpdate() {
    this.cancelForm.emit();
  }

}
