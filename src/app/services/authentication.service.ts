import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  firebaseUser: Observable<firebase.User>;
  user: BehaviorSubject<User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseApiUserService: UserService
  ) {

  this.firebaseUser = firebaseAuth.authState;
  }


  async signup(user: User)  {

    try {
        await this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

    } catch (err) {
      const msg = err.message;

      return {error: msg};
    }

    this.addUser();

  }


  async login(email:string, password:string) {
    try {
      await this.firebaseAuth.auth.signInWithEmailAndPassword(email,password);
      
    } catch (err) {
      const msg = err.message;
      return {error: msg};
    }
  }


  logout() {
    return this.firebaseAuth.auth.signOut();
  }

  authUser() {
    return this.firebaseUser;
  }

   addUser(){
   return this.user
}



}
