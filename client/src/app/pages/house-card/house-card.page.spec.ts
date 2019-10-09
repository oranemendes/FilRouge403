import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCardPage } from './house-card.page';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@ionic/storage";

describe('HouseCardPage', () => {
  let component: HouseCardPage;
  let fixture: ComponentFixture<HouseCardPage>;

  beforeEach(async(() => {
    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
    };
    TestBed.configureTestingModule({
      declarations: [ HouseCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: storageIonicMock},
        { provide: ActivatedRoute},
        { provide: HttpClient},
        { provide: HTTP}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
