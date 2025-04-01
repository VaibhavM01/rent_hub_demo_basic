import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { DataStorageService } from '../data-store/data-store.service';
import { CommaExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private dataStore : DataStorageService) {}

  // Get comments for a specific post from sessionStorage
  getComments(postId : number): Comment[] {
     const comments = this.dataStore.getComments(postId!);
     return comments;
    // const storedComments = sessionStorage.getItem(this.storageKey);
    // if (!storedComments) return [];
 
    // const allComments: Comment[] = JSON.parse(storedComments);
    // return allComments.filter(comment => comment.postId === postId);
  }
 
  // Add a new comment and update sessionStorage
  addComment(postId : number ,userName : string ,newComment: Comment) {
     const commentCount = this.getComments(postId!).length;
    if(!commentCount){
      this.dataStore.saveComments(postId, [newComment]);
    }
    else{
      this.dataStore.addComment(postId, userName,newComment);
    }



   
//     const allComments = this.getAllComments();
// newComment.id = new Date().getTime(); // Generate unique ID using timestamp
//     newComment.createdAt = new Date();
//     allComments.push(newComment);
    
//     sessionStorage.setItem(this.storageKey, JSON.stringify(allComments));
  }
 
  // Delete a comment and update sessionStorage
  deleteComment(commentId: number , postId : number) {
   
    this.dataStore.deleteComment(commentId, postId);

  }
 
  // // Helper function to get all comments (not just for a specific post)
  // private getAllComments(): Comment[] {
  //   const storedComments = sessionStorage.getItem(this.comment_storage_key);
  //   return storedComments ? JSON.parse(storedComments) : [];
  // }
}
