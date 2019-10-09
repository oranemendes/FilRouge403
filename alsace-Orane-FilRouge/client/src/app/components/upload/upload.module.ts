import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {FileUploadModule} from "ng2-file-upload";
import {UploadBrowserComponent} from "./upload-browser/upload-browser.component";
import {UploadModileComponent} from "./upload-modile/upload-modile.component";

@NgModule({
  declarations: [
      UploadBrowserComponent,
      UploadModileComponent
  ],
    imports: [
        CommonModule,
        IonicModule,
        FileUploadModule
    ],
    exports: [
        UploadBrowserComponent,
        UploadModileComponent
    ]
})
export class UploadModule { }
