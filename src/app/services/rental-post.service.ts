import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalPost } from '../models/rental-post';
import { DataStorageService } from '../data-store/data-store.service';
@Injectable({
  providedIn: 'root'
})
export class RentalPostService {

  public  imgaList : string [] =[
     'Retal-photo/istockphoto-1156284425-612x612.jpg',
   'Retal-photo/istockphoto-1266155645-612x612.jpg',
  'Retal-photo/istockphoto-1357529933-612x612.jpg'
  
  ]
 
  constructor(private dataService: DataStorageService){}
 
 
  
   
   getAllPost() : RentalPost[]{
   return  this.dataService.getAllPosts() ?? [];
   }

   creatRentalPost(rentalPost : RentalPost): RentalPost | undefined {

     return this.dataService.addPost(rentalPost);
   }
   getRentalPostById(postId : number ) : RentalPost | undefined{
     return this.dataService.getPostById(postId);
  }
   removeRentalPost(postId : number){
  this.dataService.deletePost(postId);
   }
   
  // // Fetch all rental posts
  // getRentalPosts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }
 
//   // Fetch a single rental post by ID
//   getRentalPostById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/${id}`);
//   }
// // //Dummy method
  // createRentalPost(postData: any, files: File[]): Observable<any>{

  //    return new Observable<any>;
  //  };
 
  // Create a new rental post with images
//   createRentalPost(postData: any, files: File[]): Observable<any> {
//     const formData = new FormData();
    
//     // Append form data fields
//     formData.append('title', postData.title);
//     formData.append('description', postData.description);
// formData.append('rent', postData.rent);
 
//     // Append images
//     files.forEach((file, index) => {
// formData.append('photos', file, file.name);
//     });
 
// // return this.http.post<any>(this.apiUrl, formData, {
// //       headers: new HttpHeaders({
// //         // 'Content-Type': 'multipart/form-data' --> NOT needed for FormData
// //       }),
// //       reportProgress: true
// //     });
//  }
}
