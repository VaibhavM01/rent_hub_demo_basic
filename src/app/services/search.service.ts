import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject = new BehaviorSubject<string>(''); // Observable to hold search query
  searchQuery$ = this.searchQuerySubject.asObservable(); // Expose it as an observable
 
  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query); // Update the search query
  }
}
