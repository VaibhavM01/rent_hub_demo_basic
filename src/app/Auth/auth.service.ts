import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { DataStorageService } from '../data-store/data-store.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated : BehaviorSubject<boolean>;
  private username : BehaviorSubject<string | null>;
  constructor(private dataStorage: DataStorageService) {

     this.isAuthenticated = new BehaviorSubject<boolean>(this.checkLoginStatus());
     this.username = new BehaviorSubject<string | null>(this.getLoggedInUsername());
  }
 
 
  /*** ================ USER REGISTRATION ================== ***/
  register(user: User): boolean {
    
    return this.dataStorage.saveUser(user);
  }
 
  /*** ================ USER LOGIN ================== ***/
  login(email: string, password: string): boolean {
    
    const users = this.dataStorage.getUsers();
   const user = Array.from(users).find(u => u.email.toLocaleLowerCase() == email.toString().toLocaleLowerCase() && u.password.trim() == password.toString().trim());
    console.log(user);
    if (user) {
      this.dataStorage.loginUser(user);
      return true;
    }
    return false;
  }
 
  /*** ================ CHECK IF USER IS LOGGED IN ================== ***/
  
  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
  /*** ================ GET LOGGED-IN USER ================== ***/
  getLoggedInUser(): User | null {
    return this.dataStorage.getLoggedInUser();
  }
 
   checkLoginStatus(): boolean {
    return this.dataStorage.getLoggedInUser()!== null;
  }
   getLoggedInUsername(): string | null {
    
    const user = this.dataStorage.getLoggedInUser();
    return user ? user.fullName : null;
  }
  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }
 
  getAuthStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  /*** ================ USER LOGOUT ================== ***/
  logout(): void {
    this.dataStorage.logoutUser();
  }
}
