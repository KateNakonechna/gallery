import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = afs.collection<User>('users');
    this.users = this.userCollection.valueChanges();
  }

  addUser(user: User) {
    this.userCollection.add(user)
      .then(res => console.log('User added'))
      .catch(err => console.log(err.message));
  }
}
