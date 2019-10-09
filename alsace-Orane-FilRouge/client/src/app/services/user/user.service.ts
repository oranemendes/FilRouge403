import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public adminSubject = new Subject<boolean>();
    private admin = false;

  constructor(private storage: Storage) { }

    /**
     * toogle adminstrator mode state
     * @param cb: return state of admin
     */
  public adminToogle(cb) {
      this.admin = !this.admin;
      this.emitAdminState();
      this.storage.set('adminState', this.admin);
      return cb(this.admin);
  }

    /**
     * emit admin state
     */
  public emitAdminState() {
      this.adminSubject.next(this.admin);
  }

    /**
     * Set admin state on storage
     * @param cb: return admin state
     */
  public getAdminStorage(cb) {
      this.storage.get('adminState')
          .then((val) => {
              if (!val) {
                  // do nothing
                  return cb(false);
              } else {
                  this.admin = val;
                  this.emitAdminState();
                  return cb(val);
              }
          });
  }
}
