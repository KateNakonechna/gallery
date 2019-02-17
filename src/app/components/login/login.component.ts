import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';


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

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [
        Validators.required, Validators.email
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  signIn() {
    this.submitted = true;
    const {email, password} = this.loginForm.value;
    this.authService.login(email, password)
      .then(resolve => this.router.navigate(['/gallery'])
        .catch(error => this.errorMsg = error.message));
    // console.log(this.loginForm.value.email, this.loginForm.value.password);
  }
}
