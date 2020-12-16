import { TestBed } from '@angular/core/testing';

import { PostsObservableService } from './posts-observable.service';

describe('PostsObservableService', () => {
  let service: PostsObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
