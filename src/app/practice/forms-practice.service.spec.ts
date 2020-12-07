import { TestBed } from '@angular/core/testing';

import { FormsPracticeService } from './forms-practice.service';

describe('FormsPracticeService', () => {
  let service: FormsPracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsPracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
