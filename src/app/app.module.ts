import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { LoginComponent } from './components/login/login.component';
import { UploadComponent } from './components/upload/upload.component';

import { ReactiveFormsModule , FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {AppRouterModule} from './app-router.module';
import {AuthenticationGuard} from './guards/authentication.guard';
import {AuthenticationService} from './services/authentication.service';
import {ImageService} from './services/image.service';
import {UploadService} from './services/upload.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RegistrationComponent} from './components/registration/registration.component';
import {EntranceComponent} from './components/entrance/entrance.component';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    ImageDetailComponent,
    LoginComponent,
    UploadComponent,
    RegistrationComponent,
    EntranceComponent,
    HomeComponent


  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
   AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    ImageService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
