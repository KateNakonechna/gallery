import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {GalleryImage} from '../models/galleryImage.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private uid: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.firebaseAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.uid = auth.uid;
      }
    });
  }

 /* getImages(): Observable<GalleryImage[]> {
    return this.db.collection('uploads')
  }*/

}
