import {Component, OnDestroy, OnInit} from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment';
import {ApiService} from './services/api/api.service';
import { LanguageService } from './services/language/language.service';
import {Subscription, timer} from 'rxjs';
import {UserService} from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    public adminState = false;
    public lgTrsl: any;
    public language: string;
    private dataLgSubscription: Subscription;
    public showSplash = true; // <-- show animation
    public domain = '';
    public prodMode = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private langueService: LanguageService,
    private menu: MenuController,
    private userService: UserService,
    private apiService: ApiService
  ) {
    this.initializeLanguage();
    this.initializeApp();
  }

  ngOnInit() {
      this.prodMode = environment.production;
      this.onRefreshLanguage();
      this.getAdminState();
      this.defineDomain();
  }

  public closeMenu() {
      this.menu.close();
  }


  public adminToogle() {
      this.userService.adminToogle((res) => {
          this.adminState = res;
      });
  }

    /**
     * Change the language
     */
    public onChangeLanguage() {
        this.langueService.changeLanguage(this.language);
        this.closeMenu();
    }

    /**
     * Get state of admin mode
     */
    private getAdminState() {
        this.userService.getAdminStorage((res) => {
            this.adminState = res;
        });
    }

    /**
     * on language change event
     */
    private onRefreshLanguage() {
        this.dataLgSubscription = this.langueService.datatLgSubject.subscribe(() => {
            this.lgTrsl = this.langueService.dataLanguage.global;
            this.language = this.langueService.language;
            if (this.language === undefined) {
                this.langueService.emitDataLg();
            }
        });
    }

    /**
     * Initialize the default language
     */
    private initializeLanguage() {
        this.langueService._initializeTranslation();
    }

    /**
     * Initialize the App
     */
    private initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
        });
    }

    /**
     * Define the domain adresse
     */
    private defineDomain() {
        this.domain = this.apiService.domain;
    }

    ngOnDestroy() {
        if (this.dataLgSubscription) {
            this.dataLgSubscription.unsubscribe();
        }
    }
}
