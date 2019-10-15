import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import { NewHousePage } from './new-house.page';

describe('NewHousePage', () => {
  let component: NewHousePage;
  let fixture: ComponentFixture<NewHousePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHousePage ],
      providers: [FormBuilder, ReactiveFormsModule, FormGroup],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      /*  .overrideComponent(NewHousePage, {
          set: {
            providers: [
              { provide: ApiService, useClass: apiService }
            ]
          }
        }) */
    .compileComponents()
        .then(() => {
    fixture = TestBed.createComponent(NewHousePage);
    component = fixture.componentInstance;
    component.ngOnInit();
    });
  });

 /* beforeEach(() => {
    fixture = TestBed.createComponent(NewHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); */


/*  describe('New House Page form', () => {
    function creatForm() {
      this.form = this.formBuilder.group({
        city: new FormControl ('', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern('^[a-zA-Zéèàç_.-]+$'),
          Validators.required
        ]), null),
        street: new FormControl ('', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(255)
        ]), null),
        lat: new FormControl ('', Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(255),
          Validators.required
        ]), null),
        lng: new FormControl ('', Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(255),
          Validators.required
        ]), null)
      });
    }
    // Create reusable function for a dry spec
    function updateForm(houseCity: string, houseStreet: string, houseLat: string, houseLng: string) {
      this.form.controls.city.setValue(houseCity);
      this.form.controls.street.setValue(houseStreet);
      this.form.controls.lat.setValue(houseLat);
      this.form.controls.lng.setValue(houseLng);
    }
    function onSubmitForm() {
      this.postHouse(this.form.value.city, this.form.value.street, {lat: this.lat, lng: this.lng});
    }
    // tslint:disable-next-line:only-arrow-functions
    it('Form invalid when empty', function() {
      creatForm();
      updateForm('', '', '', '');
      onSubmitForm();
      expect(this.form.valid).toBeFalsy();
    });
  /*  it('city field validity', () => {
      let city = component.form.controls.city;
      expect(city.valid).toBeFalsy();
    }); */



  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
