import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient},
      { provide: HTTP}
    ]
  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
