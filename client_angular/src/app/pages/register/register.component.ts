import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    userId: 0,
    name: '',
    phone: '',
    email: '',
    address: '',
    loginName: '',
    password: '',
    role: 'Donor',
    panNumber: ''
  }
  submitted = false;
  errorMessage: string = '';


  constructor(private userService: UserService, private router: Router) {}

  handleRegistration(form: NgForm) {
    this.submitted = true;
    this.errorMessage = ''; // Reset error message
    
    if (form.valid) {
        this.userService.registerUser(this.user).subscribe({
            next: (response) => {
                console.log("Registration successful", response);
                // Navigate to login or show success message
                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.error("Registration error:", error);
                if (error.status === 409) {
                    this.errorMessage = 'Username already exists. Please choose a different username.';
                } else {
                    this.errorMessage = 'Registration failed. Please try again.';
                }
            }
        });
    }
}
}
