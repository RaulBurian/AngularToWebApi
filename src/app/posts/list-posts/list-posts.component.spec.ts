import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListPostsComponent} from './list-posts.component';
import {HttpClientModule} from '@angular/common/http';
import {Router, RouterModule} from '@angular/router';
import {PostsRoutingModule} from '../posts-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ToListItemPipe} from '../pipes/to-list-item.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

describe('ListPostsComponent', () => {
  let component: ListPostsComponent;
  let fixture: ComponentFixture<ListPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListPostsComponent,
        ToListItemPipe
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
