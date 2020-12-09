import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTagModalComponent} from './create-tag-modal.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BaseCreateComponent} from '../base-create/base-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';

describe('CreateTagModalComponent', () => {
  let component: CreateTagModalComponent;
  let fixture: ComponentFixture<CreateTagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateTagModalComponent,
        BaseCreateComponent
      ],
      imports: [
        HttpClientModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
