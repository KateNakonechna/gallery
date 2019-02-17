import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService
  ) {

    this.user = firebaseAuth.authState;
  }


  async signup(
    email: string,
    password: string,
    firstName: string,
    secondName: string): Promise<any> {

    try {
      const value: firebase.auth.UserCredential = await this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password);
      const uid: string = value.user.uid;
      // const user = new User(email, firstName, secondName);
      // console.log(user);
      this.userService.addUser({uid, email, firstName, secondName});
      console.log('Success');

    } catch (err) {
      const msg = err.message;

      return {error: msg};
    }


  }


  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  authUser() {
    return this.user;
  }

}
