import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-root',
  imports: [ RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rent-hub';
}
