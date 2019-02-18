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
      const userInfo: firebase.auth.UserCredential = await this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password);

      const uid: string = userInfo.user.uid;
      this.userService.addUser({uid, email, firstName, secondName});
      console.log('Success');

    } catch (err) {
      const msg = err.message;

      return {error: msg};
    }
  }


  async login(email: string, password: string) {
    try {
      await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      const msg = err.message;
      return {error: msg};
    }
  }


  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  authUser() {
    return this.user;
  }

}
