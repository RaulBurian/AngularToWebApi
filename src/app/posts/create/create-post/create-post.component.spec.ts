import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreatePostComponent} from './create-post.component';
import {HttpClientModule} from '@angular/common/http';
import {BaseCreateComponent} from '../base-create/base-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BaseCreateComponent,
        CreatePostComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
