import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";

describe('UploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient},
      { provide: HTTP}
    ]
  }));

  it('should be created', () => {
    const service: UploadService = TestBed.get(UploadService);
    expect(service).toBeTruthy();
  });

  it('MimeType not allowed when different of png ou jpeg', () => {
    const service: UploadService = TestBed.get(UploadService);
    service.allowedMimeType = ['image/raw'];
    expect(service.allowedMimeType).toBeFalsy();
  });
});
