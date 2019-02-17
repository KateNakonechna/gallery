import {Component, OnInit} from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(
    private imageSrvice: ImageService,
  ) {

  }

  ngOnInit() {
  }

}
