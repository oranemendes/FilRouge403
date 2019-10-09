import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {PageFooterComponent} from "./page-footer/page-footer.component";
import {PageHeaderComponent} from "./page-header/page-header.component";

@NgModule({
  declarations: [
      PageHeaderComponent,
      PageFooterComponent
  ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        PageHeaderComponent,
        PageFooterComponent
    ]
})
export class PageContentModule { }
