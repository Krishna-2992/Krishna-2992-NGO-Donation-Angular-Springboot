import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CampaignsComponent } from '../../components/campaigns/campaigns.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, CampaignsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
