import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

import {User} from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  errorMsg: string;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthenticationService,
    private router: Router
  ) {
  }

  get controls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  async signIn(): Promise<void> {
    this.submitted = true;
    const {email, password} = this.loginForm.value;

    if (this.loginForm.valid) {
      const result = await this.authService.login(email, password);

      if (result && result.error) {
        this.errorMsg = result.error;
      } else {
        this.router.navigate(['/gallery']);
      }
    }
  }

}
