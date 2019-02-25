import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService extends  UserService{ // mame it inherited of UserService

  users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
  firebaseUser: Observable<firebase.User>;


  constructor(private afs: AngularFirestore) {
    super();
    this.userCollection = afs.collection<User>('users');
    this.users = this.userCollection.valueChanges();
  }

  addUser(user: User) {
    this.userCollection.add(user)
      .then(res => console.log('User added'))
      .catch(err => console.log(err.message));
  }

  getUser(uid: string ): User {
    return 
    
    
  }
}


