import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiModel} from "../../models/api.model";
import {ApiService} from "../../services/api/api.service";
import * as $ from 'jquery';
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    houseList = [];
    list = [];
    domain = '';
    indexRep = 0;
    maxLenght = 10;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.defineDomain();
    }

    defineDomain() {
        this.domain = this.apiService.domain;
    }


    /**
     * Event when we enter in this page
     */
    ionViewWillEnter() {
        this.getHouseList();
    }

    /**
     * retrieves and displays homes with infinite scrolling system and loads them at will and measure
     * @param cb
     */
    setList(cb) {
        const start = this.indexRep;
        let end = this.indexRep + this.maxLenght;
        if (end >= this.houseList.length) {
            end = this.houseList.length;
        }
        this.houseList.forEach((house, index) => {
            if (index >= start && index < end) {
                this.list.push(house);
            }
            if (index === end - 1) {
                this.indexRep = end;
                if (index === this.houseList.length - 1) {
                    return cb(true);
                } else {
                    return cb(false);
                }
            } else {
                return cb(false);
            }
        });
    }


    /**
     * loading picture [0] ((house._attachments)[0]) for all house (house.ref) it in ngFor
     * @param idImg = number auto implement whif ngfor in html
     * @param house = it is house info whif all params
     */
    setImg(idImg, house) {

            const urlImg = this.domain + '/media/' + house.ref + '/' + house.fileName;
            if (house.fileName === null) {
                $('#' + idImg).css('background-image', 'url("assets/img/no-image.jpg")');
            } else {
                // tslint:disable-next-line:max-line-length
                $('#' + idImg).css('background-image', 'linear-gradient(to right, rgba(30, 75, 115, 0) 10%, rgba(255, 255, 255, 0.8) 80%,  rgba(255, 255, 255, 1) 100%), url(' + urlImg + ')');
            }
    }

    /**
     * recover all the houses with a foreach (with parametre the referance) to recover all the house and their information
     */
    getHouseList() {
        this.houseList = [];
        this.list = [];
        this.indexRep = 0;
        const content = {
            action: 'getHouseList'
        };
        this.apiService.postApi( 'house', content, (res: ApiModel) => {
            this.houseList = res.list;
            this.setList((res) => {});
        });
    }

    /**
     * links information from infinite scrolling and the disabled or activated animation
     * @param event event of chargement to scrolling
     */
    loadData(event) {
        setTimeout(() => {
            this.setList((res) => {
                if (res) {
                    event.target.disabled = true;
                }
            });
            event.target.complete();
        }, 500);
    }

}
