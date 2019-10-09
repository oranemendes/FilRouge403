import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {environment} from "../../../environments/environment";
import {ErrorManagerService} from "../../services/error-manager/error-manager.service";
import {Map, marker} from 'leaflet';
import {MapService} from "../../services/map/map.service";
import * as $ from 'jquery';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map-comp',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {

    map: Map;
    markers = [];
    idMap: number;
    viewPos = {
        N: 47.750839,
        E: 7.335888
    };
    private located = false;
    private errorMode = false;
    private clearMarkerSubscription: Subscription;
    private setMarkerSubscription: Subscription;


    /**
     * Array of house selected. exemple: [<ref house>, <ref house>, ...]
     */
    @Input() pointsHouses: string[] = [];
    /**
     * Map zoom initialize.
     * Default = 16
     * Min = 0 Max = 18
     */
    @Input() zoom = 16;
    /**
     * Activate the geolocate of user
     * Default = true
     */
    @Input() geolocate = true;
    /**
     * Initialize the view on goelocation of user. If false, the map itialize the view on last pointsHouses position.
     * Default = false
     */
    @Input() initViewGeolocate = false;
    /**
     * Refresh current geolocation position of user every 5 secondes
     * Default = false
     */
    @Input() watch = false;
    /**
     * Activate link event on popup marquer
     * Default = true
     */
    @Input() clickPopup = true;
    /**
     * Create a itinerary to a house coordinate
     * Default = {lat: 0, lng: 0}
     */
    @Input() waypoints = {lat: 0, lng: 0};
    /**
     * On true, when click in the map, return lat and lng coordinate
     * Default = false
     */
    @Input() clickCoordinate = false;
    /**
     * Return coordinate position of click
     */
    @Output() coordinate = new EventEmitter();

    constructor(private mapService: MapService,
                private router: Router,
                private errMan: ErrorManagerService) { }

    ngOnInit() {
      this.generateMap();
      this.onClearMarkerEvent();
      this.onWayPoint();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.clickCoordinate) {
            this.onGetCoordinate();
        }
        if (changes.geolocate) {
            this.geolocation();
        }
    }

    /**
     * On event from map service, clear all marquer in map
     */
    private onClearMarkerEvent() {
        this.clearMarkerSubscription = this.mapService.clearMarkerSubject.subscribe(() => {
            if (this.markers.length > 0) {
                this.map.removeLayer(this.markers.pop());
            }
        });
    }

    /**
     * Add a way point in map without ref house
     */
    private onWayPoint() {
        this.setMarkerSubscription = this.mapService.setMarkerSubject.subscribe((gps) => {
           this.addPoint(gps.lat, gps.lng, this.pointsHouses[0]);
        });
    }

    /**
     * Set the position view map
     * @param coordN: number
     * @param coordE: number
     * @param zoom; number
     */
    private initViewPosition(coordN: number, coordE: number, zoom?: number) {
        this.viewPos.N = coordN;
        this.viewPos.E = coordE;
        if (!zoom) {zoom = this.zoom; }
        this.map.setView([this.viewPos.N, this.viewPos.E], zoom);
    }

    /**
     * create and generate the map
     */
    private generateMap() {
        this.mapService.generateIdMap((idMap) => {
            this.idMap = idMap;
            this.mapService.generateMap((map) => {
                this.map = map;
                this.geolocation();
                this.getPoint();
                this.onGetCoordinate();
            }, this.zoom);
        });
    }

    /**
     * If activate, on click in map, return lat and lng coordinate
     */
    private onGetCoordinate() {
        if (this.clickCoordinate) {
            this.mapService.onGetCoordinate((lat, lng) => {
                this.coordinate.emit({lat, lng});
                this.addSimplePoint(lat, lng);
            });
        } else {
            if (this.map !== undefined) {
                this.map.off('click');
            }
        }
    }

    /**
     * Remove previous marker and add a new marker to click position
     * @param lat: number
     * @param lng: number
     */
    private addSimplePoint(lat: number, lng: number) {
        const geojsonFeature = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "Point",
                coordinates: [lat, lng]
            }
        };
        // remove previous marker
        if (this.markers.length > 0) {
            this.map.removeLayer(this.markers.pop());
        }
        let marker1;
        L.geoJson(geojsonFeature, {
            pointToLayer: (feature, latlng) => {
                marker1 = L.marker([lat, lng], {icon: this.mapService.greenMarker});
                this.markers.push(marker1);
                return marker1;
            }
        }).addTo(this.map);
    }

    /**
     * Create a itierary between two pointsHouses.
     * @param waypoints: number[] - ex: [[<start_lat>, <start_lng>], ... , [<end_lat>, <end_lng>]]
     */
    private routingMap(waypoints: any[]) {
        if (this.waypoints.lat > 0 && this.waypoints.lng > 0) {
        setTimeout(() => {
                L.Routing.control({
                    waypoints,
                    createMarker: () => null,
                    language: 'fr',
                    fitSelectedRoutes: true,
                    router: new L.Routing.OSRMv1({
                        serviceUrl: 'http://' + environment.URL_API + ':5000/route/v1'
                    }),
                    show: false
                }).addTo(this.map);
            }, 500);
        }
    }

    /**
     * geolocate the user in map
     */
    private geolocation() {
        if (this.geolocate) {
            const zoom = this.map.getZoom();
            this.map.locate({setView: this.initViewGeolocate, watch: this.watch})
                .on('locationfound', (e) => {
                    if (!this.located) {
                        marker([e.latitude, e.longitude], {icon: this.mapService.redMarker})
                            .bindPopup('Votre position')
                            .addTo(this.map);
                        this.located = true;
                        const coord = [
                            [e.latitude, e.longitude],
                            [this.waypoints.lat, this.waypoints.lng]
                        ];
                        this.routingMap(coord);
                    }
                    this.initViewPosition(e.latitude, e.longitude, zoom);
                })
                .on('locationerror', (e) => {
                    if (environment.production) {
                        if (!this.errorMode) {
                            this.errorMode = true;
                            this.errMan.modalError(e, "Il semble avoir une erreur avec votre géolocalisation. " +
                                "Pour profiter pleinement de l'application, activez votre géolocalisation et/ou donnez " +
                                "l'autorisation à l'application depuis les paramêtres de votre appareil.",
                                (res) => {
                                    this.errorMode = false;
                                });
                        }
                    }
                });
        }
    }


    /**
     * Get and add all pointsHouses selected
     */
    private getPoint() {
        if (this.pointsHouses.length > 0) {
            this.pointsHouses.forEach((ref) => {
                this.mapService.getCoordinates(ref, (res) => {
                    if (res.coordN !== null) {
                        this.addPoint(res.coordN, res.coordE, ref);
                    }
                });
            });
        }
    }

    /**
     * Add a pointsHouses in map
     * @param lat: number
     * @param lng: number
     * @param ref: string - ref house
     */
    private addPoint(lat: number, lng: number, ref: string) {
        const marker1 = L.marker([lat, lng], {icon: this.mapService.blueMarker})
            .addTo(this.map)
            .bindPopup(`<div id="${ref}">${ref}</div>`)
            .on('click', () => {this.onClickPopup(ref); });
        if (!this.initViewGeolocate) {
            this.initViewPosition(lat, lng);
        }
        this.markers.push(marker1);
    }

    /**
     * On click popup event. Link to house-card
     * @param ref: string
     */
    private onClickPopup(ref: string) {
        if (this.clickPopup) {
            $('#' + ref).click(() => {
                this.router.navigate(['/house-card/' + ref]);
            });
        }
    }

    /**
     * on destroy component, map is remove
     */
    ngOnDestroy() {
        if (this.map) {
            this.map.remove();
        }
        if (this.clearMarkerSubscription) {
            this.clearMarkerSubscription.unsubscribe();
        }
        if (this.setMarkerSubscription) {
            this.setMarkerSubscription.unsubscribe();
        }
    }
}
//
