import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient},
      { provide: HTTP}
    ]
  }));

  it('should be created', () => {
    const service: MapService = TestBed.get(MapService);
    expect(service).toBeTruthy();
  });
});
