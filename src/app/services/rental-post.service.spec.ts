import { TestBed } from '@angular/core/testing';

import { RentalPostService } from './rental-post.service';

describe('RentalPostService', () => {
  let service: RentalPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
