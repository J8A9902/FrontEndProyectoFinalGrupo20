import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { LanguageModule } from 'language';
import { UiModule } from 'ui';
import { typeUsers, typeUsersData } from '../../../../../core/utils/type-users';
import { RegisterSteps } from '../../utils/register-steps';
import { RegisterCandidateFormComponent } from '../../components/register-candidate-form/register-candidate-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LanguageModule,
    UiModule,
    RegisterCandidateFormComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  steps = RegisterSteps;
  step!: RegisterSteps;

  get typeUsersData() {
    return typeUsersData;
  }

  ngOnInit(): void {
    this.step = this.steps.initialStep;
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
    });
  }

  onSubmit() {
    const { user } = this.registerForm.value;

    if (user.code === typeUsers.candidate) {
      this.step = this.steps.createCandidateAccount;
    }
  }
}
