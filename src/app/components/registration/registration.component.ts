import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {confirmPassword} from '../../helpers/confirmPassword.helper';
import {UserService} from 'src/app/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {FirebaseUserService} from 'src/app/services/firebase-user.service';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  error: string = '';

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthenticationService,
    public firebaseUserService: FirebaseUserService,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  get controls() {
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
      validator: confirmPassword('password', 'confirmPassword')
    });
  }

  async onSubmit() {
    this.submitted = true;
    const {email, password, firstName, lastName} = this.registrationForm.value;
     
    const user =new User(email,password,firstName,lastName)
    // todo: create a user instance with new


    if (this.registrationForm.valid) {

      const result = await this.authService.signup(user);

      if (result && result.error) {
        this.error = result.error;
      } else {
        this.registrationForm.reset();
        this.toastr.success('Success', 'You have successfully registered, please login');
        this.router.navigate(['/login']);

      }

    }
  }

}


