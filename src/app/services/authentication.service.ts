import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user.model';
import {UserService} from './user.service';
import {FirebaseUserService} from './firebase-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  firebaseUser: Observable<firebase.User>;
  
  user: BehaviorSubject<User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private firebaseUserService: FirebaseUserService
  ) {
    this.firebaseUser = firebaseAuth.authState;
  }


  async signup(user: User)  {

    try {
      await this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.firebaseUserService.addUser(user)
      // move here user adding to the firebase service
      
    } catch (err) {
      const msg = err.message;

      return {error: msg};
    }
  }


  async login(email: string, password: string) {

    try {
     const userInfo =  await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
     console.log(userInfo)
     const uid: string = userInfo.user.uid;
     this.firebaseUserService.getUser(uid);
     
      // todo: after success
      // 1. get a uid from firebase user
      // 2. find a user with getUser method of firebaseUser service
      // 3. set the user to behaviour subject
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


}
