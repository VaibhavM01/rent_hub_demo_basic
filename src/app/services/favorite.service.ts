import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private storageKey = 'favoritePosts';
 
  constructor() {}
 
  // Get all favorite posts from session storage
  getFavorites(): number[] {
    const storedFavorites = sessionStorage.getItem(this.storageKey);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
 
  
  // Check if a post is favorite
  isFavorite(postId: number): boolean {
    return this.getFavorites().includes(postId);
  }
 
  // Toggle favorite status
  toggleFavorite(postId: number) {
    let favorites = this.getFavorites();
 
    if (favorites.includes(postId)) {
      favorites = favorites.filter(id => id !== postId); // Remove from favorites
    } else {
      favorites.push(postId); // Add to favorites
    }
 
    sessionStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
