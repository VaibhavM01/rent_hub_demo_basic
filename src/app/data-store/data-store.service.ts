import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { Comment } from '../models/comment';
import { RentalPost } from '../models/rental-post';
import { User } from '../models/user';
@Injectable({ providedIn: 'root' }) export class DataStorageService {

  constructor() { }
  private comment_storage_key = 'comments_';
  //  **Save comments to session storage**
  saveComments(postId: number, comments: Comment[]): void {
    sessionStorage.setItem(`${this.comment_storage_key}${postId}`, JSON.stringify(comments));
  }

  //  **Retrieve comments from session storage**
  getComments(postId: number): Comment[] {
    
    const storedComments = sessionStorage.getItem(`${this.comment_storage_key}${postId}`);
    const storedCommentsresult = storedComments ? JSON.parse(storedComments) : [];
    return this.ensureArray(storedCommentsresult);
  }

  //  **Add a new comment**
  addComment(postId: number, username: string, message: Comment): void {
    let comments = this.getComments(postId); // Get existing comments
    const newComment: Comment = {
      id: comments.length > 0 ? comments[comments.length - 1].id! + 1 : 1, // Auto-increment ID
      postId: postId,
      user: username,
      message: message.message,
      createdAt: new Date()
    };
    comments.push(newComment); // Add new comment
    this.saveComments(postId, comments); // Save updated list
  }

  //  **Delete a specific comment**
  deleteComment(postId: number, commentId: number): void {
    let comments = this.getComments(postId); // Get all comments
    comments = comments.filter(comment => comment.id !== commentId); // Remove specific comment
    this.saveComments(postId, comments); // Save updated list
  }

  // ================= Local Storage (For Favorite Posts) ================= // saveFavorite(postId: number): void { let favorites = JSON.parse(localStorage.getItem('favorites') || '[]'); if (!favorites.includes(postId)) { favorites.push(postId); } localStorage.setItem('favorites', JSON.stringify(favorites)); }
  //rental-post-storage-key
  private storageKey = 'rental_post';
   
  // Initialized data 

   initializeRentalListing(posts : RentalPost[]){
    
    if(!localStorage.getItem(this.storageKey)){
      this.savePosts(posts);
    }
  }

  //  **Save all rental posts to local storage**
  private savePosts(posts: RentalPost[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
  }

  //  **Retrieve all rental posts from local storage**
  getAllPosts(): RentalPost[] {
    const storedPosts = localStorage.getItem(this.storageKey);
    const resultPost =  storedPosts ? JSON.parse(storedPosts) : [];
    return this.ensureArray(resultPost);
  }

  //  **Add a new rental post**
  addPost(post: RentalPost): RentalPost |undefined {
    let posts = this.getAllPosts();
    post.id = posts.length > 0 ? posts[posts.length - 1].id! + 1 : 1; // Auto-increment ID
    posts.push(post);
    this.savePosts(posts);
     return this.getPostById(post.id);
  }
  //  **Get a single post by ID**
  getPostById(postId: number): RentalPost | undefined {
    return this.getAllPosts().find(post => post.id === postId);
  }

  //  **Delete a rental post**
  deletePost(postId: number): void {
    let posts = this.getAllPosts().filter(post => post.id !== postId);
    this.savePosts(posts);
  }


  getFavorites(): number[] { return JSON.parse(localStorage.getItem('favorites') || '[]'); }

  removeFavorite(postId: number): void { let favorites = JSON.parse(localStorage.getItem('favorites') || '[]'); favorites = favorites.filter((id: number) => id !== postId); localStorage.setItem('favorites', JSON.stringify(favorites)); }

  // ================= User Authentication (Local Storage for Persistence) ================= 

  private userKey = 'users'; // Key for storing users in localStorage
  private sessionKey = 'user_sessionKey'; // Key for session storage
 

 
  /*** ================= USER DATA MANAGEMENT ================== ***/
   ensureArray(input: any): any[] {
    if (Array.isArray(input)) {
      return input; // Return the array as is.
    } else if (input && typeof input === 'object') {
      return [input]; // Wrap the object in an array.
    } else {
      return []; // Return an empty array for non-object types.
    }
  }
  // Save user to localStorage
  saveUser(user: User): boolean {
    
    let users = this.getUsers();
    users = this.ensureArray(users);
 if (Array.from(users).some(u => u.email === user.email)) {
      return false; // User with this email already exists
    }
  user.id = users.length + 1;
    user.createdAt = new Date();
    users.push(user);
    localStorage.setItem(this.sessionKey, JSON.stringify(users));
    return true;
  }
 
  // Get all registered users
  getUsers(): User[] {
    
    const users = localStorage.getItem(this.sessionKey);
    const result = users ? JSON.parse(users) : [];
    return this.ensureArray(result);
  }
 
  // Authenticate user on login
  loginUser(user: User): void {
    console.log("user input " + user + "session key "+ this.sessionKey);
    sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
  }
 
  // Get currently logged-in user
  getLoggedInUser(): User | null {
    
    const user = sessionStorage.getItem(this.sessionKey);
    return   user ? JSON.parse(user) : null;
  }
 
  // Logout user
  logoutUser(): void {
    sessionStorage.removeItem(this.sessionKey);
    //sessionStorage.removeItem(this.sessionKey);
   
  }
}