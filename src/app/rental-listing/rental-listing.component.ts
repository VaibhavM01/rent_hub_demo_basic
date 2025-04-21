import { Component, OnInit } from '@angular/core';
import { RentalListingService } from '../services/rental-listing.service';
import { Rental } from '../models/rental';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { FavoriteService } from '../services/favorite.service';
import { RentalPost } from '../models/rental-post';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
import { SearchService } from '../services/search.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-rental-listing',
  imports: [CommonModule, RouterModule],
  templateUrl: './rental-listing.component.html',
  styleUrl: './rental-listing.component.css'
})
export class RentalListingComponent implements OnInit {

  isFilterOn = false;
  rentalPosts: RentalPost[] = [];
  filteredPosts: RentalPost[] = [];
  searchQuery: string = '';
  newRentalList: RentalPost[] = [];
  rentalList: RentalPost[] = [{
    id: 1,
    apartmentName: "Sunrise Apartments",
    title: "Spacious 2BHK with Sea View",
    isShared: false,
    location: "Miami, FL",
    squareFeet: 1200,
    rent: 2500,
    isNegotiable: true,
    priceMode: "per month",
    furnished: true,
    amenities: ["WiFi", "Swimming Pool", "Gym", "Parking"],
    description: "A beautiful, well-furnished apartment with a stunning sea view.",
    images: ["/rent_hub_demo_basic/Retal-photo/large-home-residential-house.jpeg"]
  },
  {
    id: 2,
    apartmentName: "Downtown Loft",
    title: "Modern Loft in the City Center",
    isShared: true,
    location: "New York, NY",
    squareFeet: 800,
    rent: 1800,
    isNegotiable: false,
    priceMode: "per month",
    furnished: false,
    amenities: ["Elevator", "Laundry", "Security"],
    description: "A stylish loft in the heart of the city, perfect for young professionals.",
    images: ["/rent_hub_demo_basic/Retal-photo/stock-photo-new-moder.jpg"]
  },
  {
    id: 3,
    apartmentName: "Greenview Residences",
    title: "Cozy 1BHK Near Park",
    isShared: false,
    location: "San Francisco, CA",
    squareFeet: 650,
    rent: 1500,
    isNegotiable: true,
    priceMode: "per month",
    furnished: true,
    amenities: ["WiFi", "Garden", "Pet Friendly"],
    description: "Peaceful and cozy apartment with a beautiful park view.",
    images: ["/rent_hub_demo_basic/Retal-photo/istockphoto-1255835529-1024x1024.jpg"]
  },
  {
    id: 4,
    apartmentName: "Skyline Towers",
    title: "Luxury 3BHK Penthouse",
    isShared: false,
    location: "Los Angeles, CA",
    squareFeet: 2000,
    rent: 5000,
    isNegotiable: false,
    priceMode: "per month",
    furnished: true,
    amenities: ["Roof Deck", "Gym", "Swimming Pool", "24/7 Security"],
    description: "A luxury penthouse with breathtaking skyline views and top-notch facilities.",
    images:["/rent_hub_demo_basic/Retal-photo/istockphoto-175537632-1024x1024.jpg"]
  }];
   
  constructor(private rentalService: RentalListingService,
    private favoriteService: FavoriteService,
    private searchService : SearchService,
    private sanitizer : DomSanitizer
  ) {
    this.rentalService.initializeRentalListing(this.rentalList);


  }
  getSafeUrl(blobUrl: string): any {
    console.log( this.sanitizer.bypassSecurityTrustUrl(blobUrl))
    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
  }
  isFavorite(postId: number): boolean {
    return this.favoriteService.isFavorite(postId);
  }

  toggleFavorite(id: number) {
    if (id) {
      this.favoriteService.toggleFavorite(id!);
    }
  }
  initializeRentalListing(posts: RentalPost[]) {
    this.rentalService.initializeRentalListing(posts);
  }


  getAllRentalPost() {
    const postList = this.rentalService.getRetalPostList();
    return postList;
  }
  ngOnInit(): void {
    
    this.newRentalList = this.getAllRentalPost();
    this.loadRentalPosts();
    this.searchService.searchQuery$.subscribe(query => {
      this.filterPosts(query);
    });
  
  }
  loadRentalPosts(): void {
    this.rentalPosts = this.newRentalList; // Fetch rental posts
    this.filteredPosts = this.rentalPosts; // Initialize with all posts
  }
  filterPosts(query: string): void {
    query = query.trim().toLowerCase();
 
    if (query === '') {
      // If search is empty, show all posts
      this.filteredPosts = [...this.rentalPosts];
    } else {
      // Otherwise, filter based on search criteria
      this.filteredPosts = this.rentalPosts.filter(post =>
        post.apartmentName.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query) ||
        post.amenities.some(amenity => amenity.toLowerCase().includes(query))
      );
    }
  }
 

}
