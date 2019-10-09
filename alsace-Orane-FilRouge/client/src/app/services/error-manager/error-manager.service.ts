import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ErrorManagerService {

  constructor(private alertController: AlertController) { }

    /**
     * Show a modal alert
     * @param error: any
     * @param text: string
     * @param cb: return true when click 'ok'
     */
  public modalError(error: any, text?: string, cb?) {
      if (text === undefined) {
        text = 'Il semblerait qu\'une erreur soit survenue. Réessayez plus tard.';
        }
      console.log(error, text);
      this.presentAlert(text, (res) => {
          return cb(res);
      });
  }

    /**
     * Show a modal alert
     * @param text: string - message of error
     * @param cb: return true when click 'ok'
     */
  private async presentAlert(text: string, cb) {
      const alert = await this.alertController.create({
            header: 'Oups !',
            subHeader: 'Une erreur est survenue',
            message: text,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        return cb(true);
                    }
                }
            ]
        });

      await alert.present();
    }
}
