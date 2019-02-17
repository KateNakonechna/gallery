import {Injectable} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabase} from '@angular/fire/database';
import {Upload} from '../models/upload.model';
import {FirebaseListObservable} from '@angular/fire/database-deprecated';
import {GalleryImage} from '../models/galleryImage.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  private uploads: FirebaseListObservable<GalleryImage[]>;

  constructor(
    ngFire: AngularFireModule,
    private db: AngularFireDatabase
  ) {
  }

  uploadFile(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const putUpload = storageRef.child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);
  }


}

