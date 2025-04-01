import { Component } from '@angular/core';
import { RentalPostService } from '../services/rental-post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RentalPost } from '../models/rental-post';
@Component({
  selector: 'app-preview-post',
  imports: [CommonModule, RouterModule],
  templateUrl: './preview-post.component.html',
  styleUrl: './preview-post.component.css'
})
export class PreviewPostComponent {

  postData : any;
  imagePreviews !: string[];
  constructor(private router: Router, private rentalPostService: RentalPostService) {}
 
  ngOnInit() {
    const storedData = sessionStorage.getItem('previewPostData');
    if (storedData) {
      this.postData = JSON.parse(storedData);
      console.log(this.postData);
    } else {
      this.router.navigate(['/createpost']); // Redirect if no data
    }
  }
 
  submitPost() {
    
    const rental = this.rentalPostService.creatRentalPost(this.postData);
      
    if(rental!==undefined){
        alert("Post submitted successfully!");
        sessionStorage.removeItem('previewPostData');
        this.router.navigate(['/home']); // Redirect to homepage
    }else{
      console.error("Error submitting post:");
      alert("Failed to submit post.");
    }
  }
 
  goBack() {
    this.router.navigate(['/createpost']);
  }
}
