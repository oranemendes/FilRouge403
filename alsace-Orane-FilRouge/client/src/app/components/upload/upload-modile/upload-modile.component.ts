import {HttpClient} from "@angular/common/http";
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {Camera, CameraOptions, PictureSourceType} from "@ionic-native/camera/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {File, FileEntry} from "@ionic-native/file/ngx";
import {HTTP} from "@ionic-native/http/ngx";
import {WebView} from "@ionic-native/ionic-webview/ngx";
import {ActionSheetController, LoadingController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {finalize} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {ApiModel} from "../../../models/api.model";
import {ApiService} from "../../../services/api/api.service";
import {UploadService} from "../../../services/upload/upload.service";

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-upload-modile',
  templateUrl: './upload-modile.component.html',
  styleUrls: ['./upload-modile.component.scss'],
})
export class UploadModileComponent implements OnInit, OnChanges {

    @Input() fileName;
    @Input() inc;
    @Output() fileExt = new EventEmitter<string>();
    fileNameExt;
    images = [];
    private domain = 'http://' + environment.URL_API + ':' + environment.PORT_API;

    constructor(private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
                private actionSheetController: ActionSheetController, private toastController: ToastController,
                private storage: Storage, private plt: Platform, private loadingController: LoadingController,
                private refDetect: ChangeDetectorRef, private filePath: FilePath, private platform: Platform,
                private uploadService: UploadService, private apiService: ApiService, private ionHttp: HTTP) { }

    ngOnInit() {
        this.plt.ready().then(() => {
            this.loadStoredImages();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.images.forEach((img, index) => {
            this.deleteImage(img, index);
        });
    }

    loadStoredImages() {
        if (this.images.length < 1) {
            this.storage.get(STORAGE_KEY).then(images => {
                if (images) {
                    const arr = JSON.parse(images);
                    this.images = [];
                    for (const img of arr) {
                        const filePath = this.file.dataDirectory + img;
                        const resPath = this.pathForImage(filePath);
                        this.images.push({name: img, path: resPath, filePath});
                    }
                }
            });
        }
    }

    pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            const converted = this.webview.convertFileSrc(img);
            return converted;
        }
    }

    async presentToast(text) {
        const toast = await this.toastController.create({
            message: text,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }

    async selectImage() {
        this.uploadService.emitFileName();
        const actionSheet = await this.actionSheetController.create({
            header: "Prendre un média depuis:",
            buttons: [{
                text: "votre gallerie d'images",
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
                {
                    text: "votre appareil photo",
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Annuler',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    takePicture(sourceType: PictureSourceType) {
        const options: CameraOptions = {
            quality: 100,
            sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        this.camera.getPicture(options).then(imagePath => {
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
                    });
            } else {
                const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
            }
        });

    }

    createFileName(currentName) {
        const fileExt = currentName.split('.').pop();
        this.fileNameExt = fileExt;
        return this.fileName + '.' + fileExt;
    }

    copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then((success) => {
            this.updateStoredImages(newFileName);
        }, (error) => {
            this.presentToast('Error while storing file.');
        });
    }

    updateStoredImages(name) {
        if (this.images.length < 1) {
            this.storage.get(STORAGE_KEY).then(images => {
                const arr = JSON.parse(images);
                if (!arr) {
                    const newImages = [name];
                    this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
                    // this.startUpload(this.images[0]);
                } else {
                    arr.push(name);
                    this.storage.set(STORAGE_KEY, JSON.stringify(arr));
                    // this.startUpload(this.images[0]);
                }

                const filePath = this.file.dataDirectory + name;
                const resPath = this.pathForImage(filePath);

                const newEntry = {
                    name,
                    path: resPath,
                    filePath
                };

                this.images = [newEntry, ...this.images];
                this.refDetect.detectChanges(); // trigger change detection cycle
                // this.startUpload(this.images[0]);
            });
        }
    }


    startUpload(imgEntry) {
        this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
            .then((entry) => {
                ( entry as FileEntry).file(file => this.readFile(file));
            })
            .catch((err) => {
                this.presentToast('Error while reading file.');
            });
    }

    readFile(file: any) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('justificatif', imgBlob, file.name);
            this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    }

    async uploadImageData(formData: FormData) {
        const loading = await this.loadingController.create({
            message: "Média en cours d'envoie ...",
        });
        await loading.present();

        this.http.post<ApiModel>(this.domain + "/upload", formData)
            .pipe(
                finalize(() => {
                    loading.dismiss();
                })
            )
            .subscribe((res: ApiModel) => {
                if (res.success) {
                    this.fileExt.emit(this.fileNameExt);
                    // this.presentToast('Envoie réussi');
                    this.deleteImage(this.images[0], 0);
                } else {
                    this.presentToast('Envoie échoué');
                }
            });
    }

    deleteImage(imgEntry, position) {
        this.images.splice(position, 1);

        this.storage.get(STORAGE_KEY).then(images => {
            const arr = JSON.parse(images);
            const filtered = arr.filter(name => name !== imgEntry.name);
            this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

            const correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

            this.file.removeFile(correctPath, imgEntry.name).then(res => {
                // this.presentToast('File removed.');
            });
        });
    }

}
