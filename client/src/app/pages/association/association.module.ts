import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {PageContentModule} from "../../components/page-content/page-content.module";

import { AssociationPage } from './association.page';

const routes: Routes = [
  {
    path: '',
    component: AssociationPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PageContentModule
    ],
  declarations: [AssociationPage]
})
export class AssociationPageModule {}
