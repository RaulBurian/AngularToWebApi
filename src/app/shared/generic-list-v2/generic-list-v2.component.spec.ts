import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListV2Component } from './generic-list-v2.component';

describe('GenericListV2Component', () => {
  let component: GenericListV2Component;
  let fixture: ComponentFixture<GenericListV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericListV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericListV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
