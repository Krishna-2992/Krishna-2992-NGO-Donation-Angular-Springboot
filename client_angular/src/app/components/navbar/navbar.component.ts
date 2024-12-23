import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  user = this.userService.user;

  constructor(private userService: UserService){}

  ngOnInit() {
    if(typeof window !== 'undefined' && window.localStorage) {
      const userData = localStorage.getItem("user");
      if (userData) {
          const parsedUser = JSON.parse(userData);
          this.userService.user.set(parsedUser);
      }
    }
  }

  logOut() {
    this.userService.logoutUser()
  }
}
