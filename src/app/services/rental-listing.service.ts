
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { DataStorageService } from '../data-store/data-store.service';
import { RentalPost } from '../models/rental-post';
@Injectable({
  providedIn: 'root'
})
export class RentalListingService {
 
  public  imgaList : string [] =[
    'Retal-photo/istockphoto-1156284425-612x612.jpg',
  'Retal-photo/istockphoto-1266155645-612x612.jpg',
 'Retal-photo/istockphoto-1357529933-612x612.jpg'
 
 ]

 constructor(private dataService: DataStorageService){}

  getRetalPostList() : RentalPost[]{
    return this.dataService.getAllPosts();
  }

  addPost( post : RentalPost){
    this.dataService.addPost(post);
  }
  initializeRentalListing(posts : RentalPost[]){
    this.dataService.initializeRentalListing(posts);
}

  
}
