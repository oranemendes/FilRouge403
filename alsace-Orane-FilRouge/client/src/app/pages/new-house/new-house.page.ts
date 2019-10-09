import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingController, ToastController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api/api.service";
import {MapService} from "../../services/map/map.service";


@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.page.html',
  styleUrls: ['./new-house.page.scss'],
})
export class NewHousePage implements OnInit {

    @ViewChild('slides') slides;
    lat = 0;
    lng = 0;
    form: FormGroup;
    validationMessages = {
        city: [
          { type: 'required', message: 'Vous devez renseigner une Ville'},
          { type: 'minlength', message: 'Vous devez renseigner au minimume 3 caracteres'},
          { type: 'maxlength', message: 'Vous devez renseigner au maximume 255 caracteres'},
          { type: 'pattern', message: 'Les nombres ne sont pas autorisées pour une ville'}
        ],
        street: [
          { type: 'required', message: 'Vous devez renseigner une Rue'},
          { type: 'minlength', message: 'Vous devez renseigner au minimume 3 caracteres'},
          { type: 'maxlength', message: 'Vous devez renseigner au maximume 255 caracteres'}
        ],
        lat: [
            { type: 'required', message: 'Vous devez renseigner une position sur la carte'},
            { type: 'minlength', message: 'Vous devez renseigner au minimume 3 caracteres'},
            { type: 'maxlength', message: 'Vous devez renseigner au maximume 255 caracteres'}
        ]
    };
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private toastController: ToastController,
        private mapService: MapService,
        private router: Router,
        private loadingController: LoadingController) {  }

    ngOnInit() {
        this.creatForm();
        this.slides.lockSwipes(true);
    }



    /**
     * creates a form with validation security for city, street and map coordinate
     */
    private creatForm() {
        this.form = this.formBuilder.group({
            city: new FormControl ('', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(40),
                Validators.pattern('^[a-zA-Zéèàç_.-]+$'),
                Validators.required
            ]), null),
            street: new FormControl ('', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(255)
            ]), null),
            lat: new FormControl ('', Validators.compose([
                Validators.minLength(0),
                Validators.maxLength(255),
                Validators.required
            ]), null),
            lng: new FormControl ('', Validators.compose([
                Validators.minLength(0),
                Validators.maxLength(255),
                Validators.required
            ]), null)
        });
    }

    /**
     * Clear all marker in map
     */
    public onClearMapCoordinate() {
        this.onGetMapCoordinate({lat: null, lng: null});
        this.mapService.emitClearMarker();
    }

    /**
     * On click map, get the coordinate click position
     * @param event: any
     */
    public onGetMapCoordinate(event) {
      this.lat = event.lat;
      this.lng = event.lng;
      this.form.get('lat').setValue(this.lat);
      this.form.get('lng').setValue(this.lng);
    }

    /**
     * On submit formular, get data of this.
     */
    public onSubmitForm() {
        this.postHouse(this.form.value.city, this.form.value.street, {lat: this.lat, lng: this.lng});
    }

    /**
     * Change input validator in terms of input selected
     * @param value: number - id of input selected
     * 0 = street
     * 1 = map
     */
    private changeValidator(value: number) {
        if (value === 0) { // street selected
            // add required validator
            this.form.controls.street.setValidators([Validators.required]);
            // clear required validator
            this.form.controls.lat.clearValidators();
            this.form.controls.lng.clearValidators();
            // update input validity
            this.form.controls.street.updateValueAndValidity();
            this.form.controls.lat.updateValueAndValidity();
            this.form.controls.lng.updateValueAndValidity();
        } else if (value === 1) { // map selected
            // add required validator
            this.form.controls.lat.setValidators([Validators.required]);
            this.form.controls.lng.setValidators([Validators.required]);
            // clear required validator
            this.form.controls.street.clearValidators();
            // update input validity
            this.form.controls.lat.updateValueAndValidity();
            this.form.controls.lng.updateValueAndValidity();
            this.form.controls.street.updateValueAndValidity();
        }
    }


    /**
     * On click in segment, choice between street and map
     * @param event: click event
     */
    public onSegmentChanged(event) {
        this.changeValidator(Number(event.detail.value));
        this.slides.lockSwipes(false);
        this.slides.slideTo(Number(event.detail.value));
        this.slides.lockSwipes(true);
    }

    /**
     * Post data's formular to server
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: any - lat lng position
     */
    private async postHouse(city: string, street: string, gps: any) {
        const loading = await this.loadingController.create({
            message: 'En cours de modification , merci de patienter .'
        });
        await loading.present();

        const content = {
            action: 'addHouse',
            city,
            street,
            gps
        };
        this.apiService.postApi('house', content, (async (res) => {
            if (res.success) {
                const toast = await this.toastController.create({
                    message: 'La maison à été ajoutée',
                    position: 'middle',
                    duration: 2000
                });
                this.router.navigate(['/house-card/' + res.message]);
                setTimeout(async () => {
                    toast.present();
                    await loading.dismiss();
                }, 1000);
            } else {
                await loading.dismiss();
            }
        }));
    }

}
