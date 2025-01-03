  import { Component, signal } from '@angular/core';
  import { LoginUser } from '../../interfaces/login-user';
  import { JsonPipe, NgLocaleLocalization, NgIf } from '@angular/common';
  import { UserService } from '../../services/user.service';
  import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm} from '@angular/forms';
  import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import { MatButtonModule } from '@angular/material/button';
  import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
  import {MatIconModule} from '@angular/material/icon';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, JsonPipe, NgIf, MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule, MatIconModule], 
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
    value = "Clear Me"
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