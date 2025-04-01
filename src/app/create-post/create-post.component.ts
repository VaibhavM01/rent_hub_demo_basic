import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RentalPost } from '../models/rental-post';
import { CommonModule } from '@angular/common';
import { RentalPostService } from '../services/rental-post.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  postForm: FormGroup;
  apartmentOptions = ['Apartment', 'Building', 'Other'];
  leaseType = ['Long term(+6 month)', 'Short term', 'Both'];
  amenities = ['Gym/Fitness Center', 'Swimming Pool', 'Car Park', 'Power Backup', 'Garbage Disposal', 'Private Lawn', 'Water Heater', 'Plant Security System', 'Laundry Service', 'Elevator', 'Club House'];
  isChecked= false;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  photoError: string = '';
  selectedImages: string[] = [];
  selectedAmenityList :string[] = [];
 


  constructor(private fb: FormBuilder, 
    private router: Router,
     private sanitizer: DomSanitizer ) {

    const amenitiesGroup = this.fb.group({});
    this.amenities.forEach(
      amenity => {
         amenitiesGroup.addControl(
          amenity, this.fb.control(false)
         );
      }
    );

    this.postForm = this.fb.group({
      apartmentOption: ['', Validators.required],
      title: ['', Validators.required, Validators.maxLength(20)],
      fullName: ['',Validators.required,Validators.maxLength(50)],
      isShared: ['', Validators.required],
      location: ['', Validators.required],
      squareFeet: ['', [Validators.required, Validators.min(100)]],
      rent: ['', [Validators.required, Validators.min(1000)]],
      isNegotiable: [false],
      priceMode: ['per month', Validators.required],
      leased: ['', Validators.required],
      furnished: ['', Validators.required],
      amenities: [amenitiesGroup,Validators.required],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      images: [[]]
    });
  }
 
 
  onFileChange(event: any) {
    const files = event.target.files;
     this.selectedFiles = event.target.files;
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxsize = 10 * 1024 * 1024;
    if (files.length > 5) {
      this.photoError = 'You can upload a maximum of 5 images.';
      return;
    }
 //file extention and size validation.
    for (let i = 0; i<files.length; i++) {
     
      if (validFormats.indexOf(files.item(i)?.type) === -1){

        this.photoError = 'Please only use photo related format.';
        return;
      }
      else{
        console.log('Passed type check');
      }

       if (files.item(i).size > maxsize) {
        this.photoError = ` file to large : ${files.item(i)?.name}, maximum size is 10 MB`;
        return;
      }
      else {
        this.photoError = '';
        console.log('Passed size check');
      }
    }
    //convert each image to base64
    
    let paddingConversions = this.selectedFiles.length;
    Array.from(this.selectedFiles).forEach(element => {
     const reader = new FileReader();
     reader.onload = (e:any) => {
      this.imagePreviews.push(e.target.result);
      this.convertToBase64(element);
      this.saveImageToLocalStorage(element);
      paddingConversions--;

      if(paddingConversions ==0){
        console.log("all image converted ");
      }
     };

     reader.onerror = ()=> {
       console.log("Error reading files", element.name);
     };
     reader.readAsDataURL(element);
    });
  }

  selectedAmenities(amenity : string): void {

    if (this.selectedAmenityList.includes(amenity)) {
      this.selectedAmenityList = this.selectedAmenityList.filter((item) => item !== amenity);
    } else {
      this.selectedAmenityList.push(amenity);
    }
    console.log(this.selectedAmenityList);
  }

 submitPost(){
  
 }
  
   // Navigate to Preview Page with Data
   previewPost() {
    if (this.postForm.invalid || this.selectedFiles.length === 0) {
      alert("Please fill all fields and upload at least 1 image.");
      return;
    }
 
    // Store data in sessionStorage for preview
    

    
    const postData = {
      ...this.postForm.value,
      amenities:this.selectedAmenityList, 
      photos: Array.from(this.selectedFiles).map(file => URL.createObjectURL(file)) // Create temp URLs for preview
    };
 
    sessionStorage.setItem('previewPostData', JSON.stringify(postData));
    this.router.navigate(['/preview']);
  }
  getSafeUrl(blobUrl: string): any {
    console.log( this.sanitizer.bypassSecurityTrustUrl(blobUrl))
    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
  async saveImageToLocalStorage(file: File): Promise<void> {
    const base64Image = await this.convertToBase64(file);
    localStorage.setItem('savedImage', base64Image);
  }
  getSavedImage(): string | null {
    return localStorage.getItem('savedImage');
  }
  
  goHome():void{
    this.router.navigate(['']);
  }
  


  
  
}
