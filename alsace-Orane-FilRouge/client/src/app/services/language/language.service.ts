import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from "rxjs";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    public language = 'fr';
    public dataLanguage;
    public datatLgSubject = new Subject();

  constructor(private platform: Platform,
              public translate: TranslateService,
              private storage: Storage) {
      this.getlanguage();
      this.platform
          .ready()
          .then(() => {
              this._initTranslate();
          });
  }


    /**
     * Initialize the language translation
     */
    public _initializeTranslation() {
      this.getDataLanguage( (res) => {
          this.dataLanguage = res;
          this.emitDataLg();
      });
    }

    /**
     * Emit a signal when language change
     */
    emitDataLg() {
        setTimeout(() => {
            this.datatLgSubject.next();
        }, 100);
    }

    /**
     * Get all data of language selected
     * @param translatedTexte: string[] - callback
     */
    private getDataLanguage(translatedTexte) {
        setTimeout(() => {
            return translatedTexte(this.translate.instant('all'));
        }, 250);
    }

    /**
     * Change the language and translate
     * @param language: string
     */
    public changeLanguage(language: string) {
      this.language = language;
      this._translateLanguage();
    }


    /**
     * translate all data language of selected
     */
    private _translateLanguage() {
        this.translate.use(this.language);
        this.getDataLanguage((res) => {
            this.dataLanguage = res;
            this.emitDataLg();
            this.setLanguage();
        });
    }

    /**
     * Initialize the default language
     */
    private _initTranslate() {
        if (this.translate) {
            this.translate.setDefaultLang(this.language);
            if (this.translate.getBrowserLang() !== undefined) {
                this.translate.use(this.translate.getBrowserLang());
            } else {
                this.translate.use(this.language); // Set your language here
            }
        }
    }

    /**
     * Get the default language in storage
     */
    private getlanguage() {
        this.storage.get('defaultLanguage')
            .then((val) => {
                if (!val) {
                    this.language = 'fr';
                    this.setLanguage();
                } else {
                    this.language = val;
                }
            });
    }

    /**
     * set default language in storage
     */
    private setLanguage() {
        this.storage.set('defaultLanguage', this.language);
    }

}
