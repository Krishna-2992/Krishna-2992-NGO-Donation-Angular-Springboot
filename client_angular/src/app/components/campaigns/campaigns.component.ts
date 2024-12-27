import { Component } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent {

  campaigns = this.campaignService.campaigns;
  campaignsFetched: boolean = false;

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit() {
    console.log("campaign ngoninit")
    // this.campaignService.getCampaignList();
    this.campaignService.getCampaignList().subscribe({
      next: (success: boolean) => {
        if (!success) {
          this.campaignsFetched = true;
        }
      },
      error: (errorMessage: string) => {
        console.log("error fetching all the campaigns")
      }
    });

    console.log(this.campaigns())
  }

}
