import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedListingComponent } from './featured-listing.component';

describe('FeaturedListingComponent', () => {
  let component: FeaturedListingComponent;
  let fixture: ComponentFixture<FeaturedListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
