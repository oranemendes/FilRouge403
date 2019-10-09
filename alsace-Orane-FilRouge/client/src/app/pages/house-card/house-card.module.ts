import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MapCompModule} from "../../components/map/map-comp.module";
import {PageContentModule} from "../../components/page-content/page-content.module";

import { HouseCardPage } from './house-card.page';
import {GaleryComponent} from "./galery/galery.component";
import {MapingHouseComponent} from "./maping-house/maping-house.component";
import {DetailHouseComponent} from "./detail-house/detail-house.component";
import {SwiperModule} from "angular2-useful-swiper";

const routes: Routes = [
  {
    path: '',
    component: HouseCardPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        MapCompModule,
        SwiperModule,
        PageContentModule,
        ReactiveFormsModule,
        SwiperModule
    ],
  exports: [
    HouseCardPage
  ],
  declarations: [HouseCardPage, GaleryComponent, MapingHouseComponent, DetailHouseComponent]
})
export class HouseCardPageModule {}
