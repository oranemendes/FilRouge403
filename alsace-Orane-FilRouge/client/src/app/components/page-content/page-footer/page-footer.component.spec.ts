import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFooterComponent } from './page-footer.component';
import {ActivatedRoute, Router} from "@angular/router";

describe('PageFooterComponent', () => {
  let component: PageFooterComponent;
  let fixture: ComponentFixture<PageFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFooterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router},
        { provide: ActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Menu options display correct names', () => {
    it('Home', () => {
      const nameDe: DebugElement = fixture.debugElement;
      const nameNa: HTMLElement = nameDe.nativeElement;
      const n = nameNa.querySelector('#accueil');
      expect(n.textContent).toEqual('accueil');
    });
    it('Map', () => {
      const nameDe: DebugElement = fixture.debugElement;
      const nameNa: HTMLElement = nameDe.nativeElement;
      const n = nameNa.querySelector('#carte');
      expect(n.textContent).toEqual('carte');
    });
    it('Search', () => {
      const nameDe: DebugElement = fixture.debugElement;
      const nameNa: HTMLElement = nameDe.nativeElement;
      const n = nameNa.querySelector('#recherche');
      expect(n.textContent).toEqual('recherche');
    });
  });
});
