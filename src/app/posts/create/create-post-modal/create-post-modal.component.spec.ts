import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePostModalComponent} from './create-post-modal.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('CreatePostModalComponent', () => {
  let component: CreatePostModalComponent;
  let fixture: ComponentFixture<CreatePostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreatePostModalComponent
      ],
      imports: [
        HttpClientModule,
        NgbModule
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
