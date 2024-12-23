import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

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

  constructor(private userService: UserService) {}

  handleRegistration(form: NgForm) {
    this.submitted = true;
    console.log("registration: ", form)
    console.log("user: ", this.userService.registerUser(this.user))
    
  }
}
