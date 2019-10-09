import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";

describe('LanguageService', () => {
  const storageIonicMock: any = {
    get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Storage, useValue: storageIonicMock},
      { provide: TranslateService}
    ]
  }));

  it('should be created', () => {
    const service: LanguageService = TestBed.get(LanguageService);
    expect(service).toBeTruthy();
  });
});
