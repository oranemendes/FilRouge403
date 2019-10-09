import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapingHouseComponent } from './maping-house.component';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";
import {Storage} from "@ionic/storage";

describe('MapingHouseComponent', () => {
  let component: MapingHouseComponent;
  let fixture: ComponentFixture<MapingHouseComponent>;

  beforeEach(async(() => {
    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
    };
    TestBed.configureTestingModule({
      declarations: [ MapingHouseComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: storageIonicMock},
        { provide: HttpClient},
        { provide: HTTP}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapingHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
