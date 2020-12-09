import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailPostComponent} from './detail-post.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';

describe('DetailPostComponent', () => {
  let component: DetailPostComponent;
  let fixture: ComponentFixture<DetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DetailPostComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
