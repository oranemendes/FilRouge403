import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import {HttpClient} from "@angular/common/http";
import {HTTP} from "@ionic-native/http/ngx";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
    };
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: TranslateService},
        { provide: HttpClient},
        { provide: Storage, useValue: storageIonicMock},
        { provide: HTTP}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
