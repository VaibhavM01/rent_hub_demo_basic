import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-registration',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
 
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
this.registerForm = this.fb.group({
    fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  onRegister(): void {
    
    if (this.registerForm.invalid) {
      this.errorMessage = "Invalid Input format!";
      return;}
   
    const success = this.authService.register(this.registerForm.value);
    if (!success) {
      this.errorMessage = "Email already exists!";
    } else {
      this.router.navigate(['/login']);
    }
  }
  goHome() : void {
    this.router.navigate([''])
  }
}
