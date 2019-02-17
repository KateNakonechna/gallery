import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {confirmPassword} from '../../helpers/confirmPassword.helper';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  error: string;

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              public authService: AuthenticationService,
  ) {
  }

  get f() {
    return this.registrationForm.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator:  confirmPassword('password', 'confirmPassword')
    });
  }

  async onSubmit() {
    this.submitted = true;
    const {email, password, firstName, lastName} = this.registrationForm.value;
    if (this.registrationForm.valid) {
      const result = await this.authService.signup(email, password, firstName, lastName);

      if (result.error) {
        this.error = result.error;
      }

    }
  }

}

