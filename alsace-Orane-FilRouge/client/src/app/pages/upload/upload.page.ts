import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController, ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {ApiModel} from "../../models/api.model";
import {ApiService} from "../../services/api/api.service";
import {UploadService} from "../../services/upload/upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.page.html',
  styleUrls: ['upload.page.scss'],
})
export class UploadPage implements OnInit, OnDestroy {

    prodMode = false;
    form: FormGroup;
    inc = 0;
    category = '';
    mediaDate = '';
    mediaDateName = '';
    ref = '';
    mediaNumber = 1;
    fileName = '';
    fileExt = '';
    fileNameSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private uploadService: UploadService,
              private router: Router,
              private activRoute: ActivatedRoute,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private apiService: ApiService) {
      this.prodMode = environment.production;
  }

  ngOnInit() {
      this.ref = this.activRoute.snapshot.paramMap.get('ref');
      this.mediaNumber = Number(this.activRoute.snapshot.paramMap.get('nbPic'));
      this.createForm();
      this.onFileNameEvent();
  }

    /**
     * Event when we enter in this page
     */
    ionViewWillEnter() {
        this.inc++;
    }

    /**
     * On event, set the file name
     */
  onFileNameEvent() {
      this.fileNameSubscription = this.uploadService.fileNameSubject.subscribe(() => {
         this.setFileName();
      });
  }

    /**
     * Set a file name
     */
  setFileName() {
      this.getFormInput();
      this.fileName = `${this.ref}-${this.mediaDateName}-${this.category}-${this.mediaNumber}`;
  }

    /**
     * on event from uploader, send to database
     * @param event: any
     */
  onFileExt(event) {
      this.fileExt = event;
      this.sendDatabase();
  }

    /**
     * Create and initialize the reactive formular
     */
    createForm() {
        this.form = this.formBuilder.group({
            mediaDate: new FormControl('2019', [Validators.required]),
            category: new FormControl('photo')
        });
    }

    /**
     * set the média name for file name and database
     */
    setMediaDateName() {
        this.mediaDateName = this.mediaDate.replace(/ /g, '_');
    }

    /**
     * get data in form input
     */
    getFormInput() {
        this.mediaDate = this.form.get('mediaDate').value.trim();
        this.category = this.form.get('category').value.trim();
        this.setMediaDateName();
    }

    /**
     * send to database
     */
    async sendDatabase() {
        const toast = await this.toastController.create({
            message: 'Le média à été ajouté',
            position: 'middle',
            duration: 2000,
            color: "success"
        });
        const loading = await this.loadingController.create({
            message: 'En cours de modification , merci de patienter .'
        });
        await loading.present();
        const content = {
            action: 'addMedia',
            fileName: this.fileName + '.' + this.fileExt,
            category: this.category,
            mediaDate: this.mediaDate,
            ref: this.ref
        };
        this.apiService.postApi('media', content, async (res: ApiModel) => {
            if (res.success) {
                this.router.navigate(['/house-card/' + this.ref]);
                setTimeout(async () => {
                    toast.present();
                    await loading.dismiss();
                }, 1000);
            } else {
                await loading.dismiss();
            }
        });
    }

    ngOnDestroy(): void {
        this.fileNameSubscription.unsubscribe();
    }


}
