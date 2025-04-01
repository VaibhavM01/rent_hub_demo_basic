
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment-section',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input() postId!: number  | undefined;  // Post ID passed from parent
  commentForm!: FormGroup;
  comments: Comment[] = [];
 
  constructor(private fb: FormBuilder, private commentService: CommentService) {}
 
  ngOnInit() {
this.commentForm = this.fb.group({
      user: ['', Validators.required],       // Name of commenter
      message: ['', Validators.required]     // Comment text
    });
 
    this.loadComments();
  }
 
  // Load comments from sessionStorage
  loadComments() {
    this.comments = this.commentService.getComments(this.postId!);
  }
 
  // Submit a new comment
  submitComment() {
    if (this.commentForm.invalid) return;
 
    const newComment: Comment = {
      postId: this.postId,
      user: this.commentForm.value.user,
      message: this.commentForm.value.message
    };
 
    this.commentService.addComment(this.postId!,newComment.user,newComment);
    this.commentForm.reset();
    this.loadComments(); // Refresh comment list
  }
 
  // Delete a comment
  deleteComment(commentId: number, postId : number) {
    if (!confirm('Are you sure you want to delete this comment?')) return;
 
    this.commentService.deleteComment(commentId, postId);
    this.loadComments(); // Refresh comment list
  }

}
