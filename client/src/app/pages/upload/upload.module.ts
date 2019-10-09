import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {PageContentModule} from "../../components/page-content/page-content.module";
import {UploadModule} from "../../components/upload/upload.module";

import { UploadPage } from './upload.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        UploadModule,
        PageContentModule,
        ReactiveFormsModule
    ],
  declarations: [UploadPage]
})
export class UploadPageModule {}
