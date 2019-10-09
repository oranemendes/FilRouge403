import { Injectable } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {Subject} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private maxFileSize = 10 * 1024 * 1024; // 10 MB
  public uploader: FileUploader;
  public allowedMimeType = ['image/png', 'image/PNG', 'image/jpg', 'image/JPG', 'image/jpeg',  'image/JPEG'];
  private domain = '';
  public fileNameSubject = new Subject<string>();

  constructor(private apiService: ApiService) {
    this.defineDomain();
  }

  defineDomain() {
    this.domain = this.apiService.domain;
  }

  emitFileName() {
      this.fileNameSubject.next();
  }

  /**
   * set the name of file before upload
   * @param fileName: string
   */
  setFileName(fileName) {
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      const fileExtension = '.' + item.file.name.split('.').pop();
      item.file.name = fileName + fileExtension;
    };
  }

  /**
   * check the File size
   * @param callback: return error
   */
  checkFileSize(callback) {
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      switch (filter.name) {
        case 'fileSize':
          // tslint:disable-next-line:max-line-length
          const errorMessage = 'La taille du fichier dépasse la taille maximale autorisée. <br> (' + Math.round(item.size / 1024 / 1024) + ' Mb sur ' + this.maxFileSize / 1024 / 1024 + ' Mb autorisé)';
          console.log(errorMessage);
          return callback(errorMessage);
          break;
      }
    };
  }

  /**
   * upload a file to express
   */
  uploadFile() {
    this.uploader = new FileUploader({
      url: this.domain + '/upload',
      itemAlias: 'justificatif',
      allowedMimeType: this.allowedMimeType,
      maxFileSize: this.maxFileSize
    });

  }
}
