import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {Storage} from "@ionic/storage";

describe('UserService', () => {
  const storageIonicMock: any = {
    get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Storage, useValue: storageIonicMock}
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
