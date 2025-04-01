import { TestBed } from '@angular/core/testing';

import { RentalListingService } from './rental-listing.service';

describe('RentalListingService', () => {
  let service: RentalListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
