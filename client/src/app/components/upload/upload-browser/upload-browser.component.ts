import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../../services/api/api.service";
import {UploadService} from "../../../services/upload/upload.service";
import * as $ from "jquery";

@Component({
  selector: 'app-upload-browser',
  templateUrl: './upload-browser.component.html',
  styleUrls: ['./upload-browser.component.scss'],
})
export class UploadBrowserComponent implements OnInit {

    processing = false;
    validFile = true;
    uploader;
    fileNameExt;

    @Input() fileName;
    @Output() fileExt = new EventEmitter<string>();

    category = 'photo';
    mediaDate = '2019';
    ref = 'ZIMMERSHEIM_001';
    mediaNumber = 1;

    constructor(private uploadService: UploadService,
                private apiService: ApiService) {
    }

    allowedMimeType = this.uploadService.allowedMimeType.toString();

    ngOnInit() {
        this.uploadService.uploadFile();
        this.uploader = this.uploadService.uploader;
        this.checkFileSize();
    }

    /**
     * check the extension file, define and set file name
     */
    getFileName() {
        this.uploadService.emitFileName();
        const fileName: string = $('#justifFormControlFile1').val() as string;

        // check extension file
        const regex = /^jpg$|^jpeg$|^png$|JPG$|^JPEG$|^PNG$/;
        const fileExt = fileName.split('.').pop();
        this.fileNameExt = fileExt;
        // this.fileName = `${this.ref}-${this.mediaDate}-${this.category}-${this.mediaNumber}`;

        if (regex.test(fileExt)) {
            this.validFile = true;
        } else {
            alert('Oups ! Le fichier a une extension non autorisée. Les extensions acceptées sont: .jpg .jpeg .png .pdf');
            this.validFile = false;
        }
    }

    /**
     * check the File size
     */
    checkFileSize() {
        this.uploadService.checkFileSize((res) => {
            if (res) {
                alert('Oups !' + res + 'error');
                setTimeout(() => {
                    $('#justifFormControlFile1').val('');
                }, 1000);
            }
        });
    }

    /**
     * On click submit button, send file and data
     */
    onRequestSubmit() {
        // if a file selected
        if (this.uploader.getNotUploadedItems().length) {

            // set the file name
            this.uploadService.setFileName(this.fileName);

            // upload the file
            this.uploader.uploadAll();

            // response uploaded file
            this.uploader.onCompleteItem = (item: any) => {
                if (item.isSuccess) {
                    this.fileExt.emit(this.fileNameExt);
                }
                if (item.isError || item.isCancel) {
                    this.uploadFailed();
                    this.processing = false;
                }
            };
        } else {
            alert('Vous devez choisir une fichier');
        }
    }

    uploadFailed() {
        // tslint:disable-next-line:max-line-length
        alert('Opération échouée' + 'Le fichier n\'a pas été téléchargé, aucune donnée n\'à donc été enregistrée. Si le problème persiste, contactez l\'administrateur.');
    }



}
