import {NgModule} from '@angular/core';
import {BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy } from '@angular/router';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {HTTP} from "@ionic-native/http/ngx";

import {IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {SplashScreen } from '@ionic-native/splash-screen/ngx';
import {StatusBar } from '@ionic-native/status-bar/ngx';

import {AppComponent } from './app.component';
import {AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {IonicStorageModule} from "@ionic/storage";
import {SwiperModule} from "angular2-useful-swiper";
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Camera} from "@ionic-native/camera/ngx";
import {WebView} from "@ionic-native/ionic-webview/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import { File } from '@ionic-native/file/ngx';
import {ViewMediaComponent} from "./components/view-media/view-media.component";



export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [AppComponent, ViewMediaComponent],
  entryComponents: [ViewMediaComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        IonicStorageModule.forRoot(),
        SwiperModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
      TranslateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      Geolocation,
      HTTP,
      ImagePicker,
      Camera,
      WebView,
      FilePath,
      File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
