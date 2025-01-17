import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CampaignsComponent } from '../../components/campaigns/campaigns.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CampaignsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  user = this.userService.user;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // console.log("user: ", localStorage.getItem('user'))
    // const userData = localStorage.getItem("user");
    // if (userData) {
    //     const parsedUser = JSON.parse(userData);
    //     this.userService.user.set(parsedUser);
    // }
  }

}
