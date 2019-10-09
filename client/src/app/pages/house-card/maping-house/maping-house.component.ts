import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {ApiModel} from "../../../models/api.model";
import {ApiService} from "../../../services/api/api.service";
import {MapService} from "../../../services/map/map.service";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-maping-house',
  templateUrl: './maping-house.component.html',
  styleUrls: ['./maping-house.component.scss'],
})
export class MapingHouseComponent implements OnInit, OnChanges, OnDestroy {

    @Input() ref: string;

    locality: string;
    lat: number;
    lng: number;
    newLat: number;
    newLng: number;
    adminState = false;
    adminSubscription: Subscription;
    clickCoordinate = false;
    geolocate = false;

  constructor(private apiService: ApiService,
              private toastController: ToastController,
              private userService: UserService,
              private mapService: MapService) { }

  ngOnInit() {
      this.refreshAdminState();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.readPositionHouseDb();
      this.getAdminState();
  }

  onEditMap(action) {
      if (this.clickCoordinate && action === 'edit') {
          this.sendDataGps();
      }
      if (this.clickCoordinate && action === 'cancel') {
          this.newLat = null;
          this.newLng = null;
          this.mapService.emitClearMarker();
          this.mapService.emitNewMarker(this.lat, this.lng);
      }
      this.clickCoordinate = !this.clickCoordinate;
      this.geolocate = !this.geolocate;
  }

    onGetMapCoordinate(event) {
        this.newLat = event.lat;
        this.newLng = event.lng;
    }

    sendDataGps() {
        const content = {
            action: 'updateHouseGps',
            gps: {lat: this.newLat, lng: this.newLng},
            ref: this.ref
        };
        this.apiService.postApi('house', content, (async (res) => {
            if (res.success) {
                const toast = await this.toastController.create({
                    message: 'modification on bien ete pris en compte',
                    position: 'middle',
                    duration: 2000
                });
                toast.present();
                this.clickCoordinate = false;
                this.mapService.emitClearMarker();
                this.mapService.emitNewMarker(this.newLat, this.newLng);
                this.lat = this.newLat;
                this.lng = this.newLng;
            }
        }));
    }

    /**
     * Get the state of admin in user service
     */
    getAdminState() {
        this.userService.getAdminStorage((state) => {
            this.adminState = state;
        });
    }

    /**
     * On event, refresh the admin state
     */
    refreshAdminState() {
        this.adminSubscription = this.userService.adminSubject.subscribe((state: boolean) => {
            this. adminState = state;
        });
    }

    /**
     * recovery of home town location information, latitude, longitude for its placement on the map
     */
    readPositionHouseDb() {
        if (this.ref !== undefined) {
            const content = {
                action: 'getHouse',
                ref: this.ref
            };
            this.apiService.postApi('house', content, (res: ApiModel) => {
                this.locality = res.house.city;
                this.lat = res.house.lat;
                this.lng = res.house.lng;
            });
        }
    }

    ngOnDestroy(): void {
        this.adminSubscription.unsubscribe();
    }
}
