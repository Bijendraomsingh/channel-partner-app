import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchandfilterdetailPage } from './searchandfilterdetail.page';

describe('SearchandfilterdetailPage', () => {
  let component: SearchandfilterdetailPage;
  let fixture: ComponentFixture<SearchandfilterdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchandfilterdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchandfilterdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
