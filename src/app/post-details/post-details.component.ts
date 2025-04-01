import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RentalPostService } from '../services/rental-post.service';
import { FavoriteService } from '../services/favorite.service';
import { RentalPost } from '../models/rental-post';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-post-details',
  imports: [CommentSectionComponent, CommonModule, RouterModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  post: RentalPost | undefined;
  isFavorite: boolean = false;
  showComments: boolean = false; // Controls comment section visibility
  imgaelist :string[] ;
  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private postService: RentalPostService,
    private favoriteService: FavoriteService,
    private sanitizer: DomSanitizer
  ) {

    this.imgaelist  = this.postService.imgaList;
  }
 
  ngOnInit() {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(postId)) {
this.post = this.postService.getRentalPostById(postId);
if (this.post) {
        this.isFavorite = this.favoriteService.isFavorite(postId);
      }
    }
  }
  
  toggleFavorite() {
if (this.post) {
this.favoriteService.toggleFavorite(this.post.id!);
      this.isFavorite = !this.isFavorite;
    }
  }
 
  toggleComments() {
    this.showComments = !this.showComments;
  }
  goBack() {
    this.router.navigate
    (['/home']);
  }

  getSafeUrl(blobUrl: string): any {
    console.log( this.sanitizer.bypassSecurityTrustUrl(blobUrl))
    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
  }

  getSavedImage(): string | null {
    return localStorage.getItem('savedImage');
  }

}
