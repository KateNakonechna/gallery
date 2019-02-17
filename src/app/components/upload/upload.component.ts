import {Component, OnInit} from '@angular/core';
import {Upload} from '../../models/upload.model';
import {UploadService} from '../../services/upload.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  files: FileList;
  upload: Upload;

  constructor(private uploadService: UploadService) {
  }

  handleFiles(event) {
    this.files = event.target.files;
  }

  uploadFiles() {
    const filesToUpload = this.files;
    const fileIdx = _.range(filesToUpload.length);
    _.each(fileIdx, (idx) => {
      this.upload = new Upload(filesToUpload[idx]);
      this.uploadService.uploadFile(this.upload);
    });
  }

  ngOnInit() {

  }

}
