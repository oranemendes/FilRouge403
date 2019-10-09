import { TestBed, async, inject } from '@angular/core/testing';
import { Observable} from "rxjs";
import { AlertController } from "@ionic/angular";

import { ErrorManagerService } from './error-manager.service';
import "rxjs-compat/add/observable/of";

const spyAlertController = jasmine.createSpyObj('spyAlertController', ['create']);
spyAlertController.create.and.returnValue(Observable.of('Oups !'));

describe('ErrorManagerService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        ErrorManagerService,
      {
        provide: AlertController,
        useValue: spyAlertController
      }
    ]
  }));

  let service;
  beforeEach(inject( [ErrorManagerService], (_s: ErrorManagerService) => {
    service = _s;
  }));

  it('should be created', () => {
    const service: ErrorManagerService = TestBed.get(ErrorManagerService);
    expect(service).toBeTruthy();
  });

  it('display a modal error when its necessary', () => {
  //  let text: string;
  //  expect(text).toBeUndefined();
    service.modalError(404, undefined, true);
    service.presentAlert('Ok', true);
  });
});
