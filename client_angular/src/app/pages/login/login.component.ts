import { Component, signal } from '@angular/core';
import { LoginUser } from '../../interfaces/login-user';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { JsonPipe, NgLocaleLocalization, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, JsonPipe, NavbarComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginUser: LoginUser = {
    loginName: "", 
    password: ""
  }
  
  submitted = false;
  errorMessage = "";
  isLoading = false;
  
  constructor(private userService: UserService) { }

  handleLogin(form: NgForm) {
    this.submitted = true;
    this.errorMessage = "";
    this.isLoading = true;
    
    if(form.valid && this.checkValidCredentials()) {
      this.userService.loginUser(this.loginUser).subscribe({
        next: (success: boolean) => {
          this.isLoading = false;
          if (!success) {
            this.errorMessage = "An unexpected error occurred during login.";
          }
        },
        error: (errorMessage: string) => {
          this.isLoading = false;
          this.errorMessage = errorMessage;
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = "Please check your username and password format.";
    }
  }  

  checkValidCredentials(): boolean { 
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const validPassword = passwordRegex.test(this.loginUser.password);
    const validUserName = this.loginUser.loginName.length >= 4 && this.loginUser.loginName.length <= 100
    return validUserName && validPassword;
  }
}