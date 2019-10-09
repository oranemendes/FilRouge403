import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IonContent} from "@ionic/angular";
import * as $ from 'jquery';
import {ApiService} from "../../services/api/api.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.page.html',
  styleUrls: ['./house-card.page.scss'],
})
export class HouseCardPage implements OnInit  {

    @ViewChild(IonContent) content: IonContent;

    ref: string;
    inc = 0;

   locality;
   street;

  collapseDetail = false;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private userService: UserService
              ) { }

  ngOnInit() {
  }



    /**
     * Event when we enter in this page
     */
    ionViewWillEnter() {
        this.ref = '';
        this.ref = this.route.snapshot.paramMap.get('ref');
        this.getHouseDb();
        this.inc++;
    }


    /**
     * retrieve the information of BDD or Json and use them (recovery of the house info locality to use for title page he say were he is )
     */
    getHouseDb() {
        const content = {
            action: 'getHouse',
            ref: this.ref
        };
        this.apiService.postApi('house', content, (res) => {
        this.locality = res.house.city;
        this.street = res.house.street;

    });
}

    /**
     * On click collapse button, change icon et make animation scrolling
     */
    onClickCollapseDetail() {
        this.collapseDetail = !this.collapseDetail;
        const buttonCollapse = $('#accordionDetail').offset().top;
        setTimeout(() => {
            this.content.scrollToPoint(0, buttonCollapse - 60, 1000);
        }, 300);
    }

}

