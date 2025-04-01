import { Component } from '@angular/core';
import { LoginComponent } from "../Auth/login/login.component";
import { UserRegistrationComponent } from "../Auth/user-registration/user-registration.component";
import { RouterModule } from '@angular/router';
import { WelcomeNavbarComponent } from "../welcome-navbar/welcome-navbar.component";
import { RentalListingComponent } from '../rental-listing/rental-listing.component';
import { FeaturedListingComponent } from '../featured-listing/featured-listing.component'; 
import { SideBoardComponent } from '../side-board/side-board.component'; 
@Component({
  selector: 'app-welcome-page',
  imports: [RouterModule, WelcomeNavbarComponent
            ,RentalListingComponent
            ,FeaturedListingComponent
            ,SideBoardComponent],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

}
