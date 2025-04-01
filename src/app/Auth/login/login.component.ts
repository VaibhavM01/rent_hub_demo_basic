import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  loginForm: FormGroup;
  errorMessage: string = '';
 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
 
  onLogin(): void {
    
    if (this.loginForm.invalid) {
      this.errorMessage = "Invalid email format or password!";
      return;
    }
 
    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email.toString(), password.toString());
 
    if (!success) {
      this.errorMessage = "Invalid email or password!";
    } else {
      this.router.navigate(['/home']); // Redirect to home/welcome page
    }
  }
  goHome() : void {
    this.router.navigate([''])
  }

}
