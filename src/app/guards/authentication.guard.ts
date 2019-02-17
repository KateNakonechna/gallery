import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = firebaseAuth.authState;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.user.pipe(
      map((auth) => {
      if (!auth) {
        this.router.navigateByUrl('/login');
        return false;
      }
      return true;
    }),
    take(1)
    );
  }

}
