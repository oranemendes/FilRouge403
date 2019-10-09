import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationPage } from './association.page';

describe('AssociationPage', () => {
  let component: AssociationPage;
  let fixture: ComponentFixture<AssociationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
