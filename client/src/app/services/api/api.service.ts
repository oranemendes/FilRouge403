import { Injectable } from '@angular/core';
import {HTTP} from "@ionic-native/http/ngx";
import {Platform} from "@ionic/angular";
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ApiModel} from '../../models/api.model';
import {ErrorManagerService} from "../error-manager/error-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    // private domainMobile = 'http://' + environment.URL_API + ':' + environment.PORT_API;
    public domain = '';


    constructor(private ngHttp: HttpClient,
                private ionHttp: HTTP,
                private errMan: ErrorManagerService,
                private platform: Platform) {
        this.defineUrl();
    }

    /**
     * If environment production is true, set a ionic http request for mobile device, else, set a angular http request for browser
     * @param target: string
     * @param contentPost: object
     * @param cb: return response
     */
    public postApi(target: string, contentPost: any, cb) {
      if (environment.production) {
      // if (this.platform.is('ios') || this.platform.is('android')) {
          this.ionPost(target, contentPost, (response) => {
              return cb (response);
          });
      } else {
          this.ngPost(target, contentPost, (response) => {
              return cb (response);
          });
      }
    }

    /**
     * post request to node back-end and get the response. Post with http native's ionic
     * @param target - string
     * @param contentPost - object
     * @param cb: return response
     */
    private ionPost(target: string, contentPost: any, cb) {
      this.ionHttp.post(this.domain + '/' + target, contentPost, {'Content-Type': 'application/json', enctype: 'multipart/form-data'})
          .then((data) => {
              const result = JSON.parse(data.data);
              if (result.error) {
                  const err = result.errCode;
                  const msg = result.errMsg;
                  this.errMan.modalError(err, msg, () => {});
                  return cb('error');
              } else {
                  return cb(result);
              }
          })
          .catch((error) => {
              const err = error;
              const msg = "Une erreur est survenue avec le serveur. Ré-éssayez plus tard.";
              this.errMan.modalError(err, msg, () => {});
          });
    }

    /**
     * post request to node back-end and get the response. Post with httpClient's angular
     * @param target - string
     * @param contentPost - object
     * @param cb: return response
     */
    private ngPost(target: string, contentPost: any, cb) {
        this.ngHttp.post<ApiModel>(this.domain + '/' + target, contentPost).subscribe((result: ApiModel) => {
            if (result.error) {
                const err = result.errCode;
                const msg = result.errMsg;
                this.errMan.modalError(err, msg, () => {});
                return cb({success: false});
            } else {
                return cb(result);
            }
        }, (error) => {
            const err = error;
            const msg = "Une erreur est survenue avec le serveur. Ré-éssayez plus tard.";
            this.errMan.modalError(err, msg, () => {});
        });
    }

    /**
     * get windows location url and define this for the request post to backend
     */
    private defineUrl() {
        let url = window.location.href;
        const regex = /.*.\/\/.*?\//;
        url = url.match(regex).toString();
        url = url.slice(0, -1);
        const regex2 = /(.{6}):/;
        if (url.match(regex2)) {
            url = url.match(/.*:/).toString();
            url = url.slice(0, -1);
        }
        if (environment.production) {
            this.domain = 'http://' + environment.URL_API + ':' + environment.PORT_API;
        } else {
            this.domain = url + ':' + environment.PORT_API;
        }
    }
}
