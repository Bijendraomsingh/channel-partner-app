import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyearningsdocPage } from './myearningsdoc.page';

describe('MyearningsdocPage', () => {
  let component: MyearningsdocPage;
  let fixture: ComponentFixture<MyearningsdocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyearningsdocPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyearningsdocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
