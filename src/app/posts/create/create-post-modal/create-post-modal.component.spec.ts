import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePostModalComponent} from './create-post-modal.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BaseCreateComponent} from '../base-create/base-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('CreatePostModalComponent', () => {
  let component: CreatePostModalComponent;
  let fixture: ComponentFixture<CreatePostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreatePostModalComponent,
        BaseCreateComponent
      ],
      imports: [
        HttpClientModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
