import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-welcome-navbar',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './welcome-navbar.component.html',
  styleUrl: './welcome-navbar.component.css'
})
export class WelcomeNavbarComponent implements OnInit {
  searchQuery : string ='';
isLoggedIn : boolean = false;
username : string | null = '';


constructor(private auth : AuthService,
            private router : Router,
             private search : SearchService) {}

ngOnInit(): void {
  
  this.auth.getAuthStatus().subscribe(status => {
    
     this.isLoggedIn = status;
  });

  this.auth.getUsername().subscribe(name => {
    this.username = name;
  });
}
logOut() : void {
  this.auth.logout();
  this.username='';
  this.isLoggedIn=false;
   this.router.navigate(['/home']);
}

onSearch(){
 this.search.setSearchQuery(this.searchQuery);
}

}
