import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListTagsComponent} from './list-tags.component';
import {HttpClientModule} from '@angular/common/http';
import {ToGenericDataPipe} from '../pipes/to-generic-data.pipe';
import {SharedModule} from '../../shared/shared.module';

describe('ListTagsComponent', () => {
  let component: ListTagsComponent;
  let fixture: ComponentFixture<ListTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListTagsComponent,
        ToGenericDataPipe
      ],
      imports: [
        HttpClientModule,
        SharedModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
