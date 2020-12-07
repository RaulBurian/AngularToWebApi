import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormsPracticeComponent } from './template-forms-practice.component';

describe('TemplateFormsPracticeComponent', () => {
  let component: TemplateFormsPracticeComponent;
  let fixture: ComponentFixture<TemplateFormsPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFormsPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormsPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
