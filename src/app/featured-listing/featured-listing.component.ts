import { Component, OnInit } from '@angular/core';
import { Rental } from '../models/rental';
import { CommonModule } from '@angular/common';
import { RentalListingService } from '../services/rental-listing.service';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-featured-listing',
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-listing.component.html',
  styleUrl: './featured-listing.component.css'
})
export class FeaturedListingComponent implements OnInit{
  
  
  featuredRentals : Rental [] = [{
    id: 1,
    title: 'Luxury Apartment in Downtown',
    description: 'A spacious 2-bedroom apartment with modern amenities.',
    image: '/rent_hub_demo_basic/Retal-photo/pexels-photo-2079234.jpeg',
    price: 1500,
    location: 'New York, NY',
    
  }];
  constructor(private rentalService: RentalListingService, 
    private favoriteService : FavoriteService,
   private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    
    // this.rentalService.getRentalListing().subscribe(
    //   (data) => (this.featuredRentals = data.slice(0, 1)), // Show only first featured rental
    //   (error) => console.error('Error fetching featured rentals', error)
    // );
  }
  isFavorite(postId : number): boolean{
    return this.favoriteService.isFavorite(postId);
     }
  toggleFavorite() {
    if (this.featuredRentals[0]) {
    this.favoriteService.toggleFavorite(this.featuredRentals[0].id!);
         
        }
      }
      getSafeUrl(blobUrl: string): any {
        console.log( this.sanitizer.bypassSecurityTrustUrl(blobUrl))
        return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
      }

}
