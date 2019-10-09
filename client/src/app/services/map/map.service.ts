import { Injectable } from '@angular/core';
import {Map, tileLayer, icon} from 'leaflet';
import {Subject} from "rxjs";
import {ApiModel} from "../../models/api.model";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {

    public map: Map;
    public nbMap = 0;
    private viewPos = {
        N: 47.750839,
        E: 7.335888
    };
    public blueMarker = icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/icon/marker-icon-2x.png',
        shadowUrl: 'assets/icon/marker-shadow.png',
    });
    public redMarker = icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/icon/marker-icon-2x-red.png',
        shadowUrl: 'assets/icon/marker-shadow.png',
    });
    public greenMarker = icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/icon/marker-icon-2x-green.png',
        shadowUrl: 'assets/icon/marker-shadow.png',
    });
    public clearMarkerSubject = new Subject<any>();
    public setMarkerSubject = new Subject<any>();

    constructor(private apiService: ApiService) {  }

    /**
     * Emit event for clear all marker in map
     */
    public emitClearMarker() {
        this.clearMarkerSubject.next();
    }

    /**
     * Emit a new marker
     * @param lat: number
     * @param lng: number
     */
    public emitNewMarker(lat: number, lng: number) {
        this.setMarkerSubject.next({lat, lng});
    }

    /**
     * get coordinates of house
     * @param ref: string
     * @param cb: return data
     */
    public getCoordinates(ref: string, cb) {
        const content = {
            action: 'getHouse',
            ref
        };
        this.apiService.postApi('house', content, (res: ApiModel) => {
            const house = {
                ref: res.house.ref,
                coordN: res.house.lat,
                coordE: res.house.lng
            };
            return cb(house);
        });
    }

    /**
     * generate the id for multiple map
     * @param cb: return one id
     */
    public generateIdMap(cb) {
        this.nbMap += 1;
        return cb(this.nbMap);
    }

    /**
     * create and generate the map
     */
    public generateMap(cb, zoom?) {
        const domainMap = 'openstreetmap.org';
        // const domainMap = 'localhost:500';
        setTimeout(() => {
            if (!zoom) {zoom = 14; }
            this.map = new Map('mapId' + this.nbMap).setView([this.viewPos.N, this.viewPos.E], zoom);
            tileLayer('http://{s}.tile.' + domainMap + '/{z}/{x}/{y}.png', {
                attribution: '',
            }).addTo(this.map);

            return cb(this.map);
        }, 300);
    }

    /**
     * On click map, return latitude and longitude position of click
     * @param cb: (lat: number, lng: number)
     */
    public onGetCoordinate(cb: (lat: number, lng: number) => void) {
        this.map.on('click', (e) => {
            return cb(e.latlng.lat, e.latlng.lng);
        });
    }

    /**
     * Remove the global map
     */
    public removeMap() {
        if (this.map !== undefined) {
            this.map.remove();
        }
    }
}
