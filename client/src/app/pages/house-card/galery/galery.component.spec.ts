import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryComponent } from './galery.component';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";
import {Storage} from "@ionic/storage";
import {ModalController} from "@ionic/angular";

describe('GaleryComponent', () => {
  let component: GaleryComponent;
  let fixture: ComponentFixture<GaleryComponent>;

  beforeEach(async(() => {

    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
    };
    TestBed.configureTestingModule({
      declarations: [ GaleryComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Storage, useValue: storageIonicMock},
        { provide: HttpClient},
        { provide: HTTP},
        { provide: ModalController}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
