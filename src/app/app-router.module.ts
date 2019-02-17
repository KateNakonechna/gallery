import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GalleryComponent} from './components/gallery/gallery.component';
import {UploadComponent} from './components/upload/upload.component';
import {ImageDetailComponent} from './components/image-detail/image-detail.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {EntranceComponent} from './components/entrance/entrance.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'image/:id',
    component: ImageDetailComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: EntranceComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRouterModule {
}
