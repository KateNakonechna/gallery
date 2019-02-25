import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
// todo: make abstract
export abstract class UserService {

  user: BehaviorSubject<User>;


  constructor() {
  }

  addUser(user:User) {
   
  }
}
