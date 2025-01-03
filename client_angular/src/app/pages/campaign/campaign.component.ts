import { Component, computed, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../../services/donation.service';
import { UserService } from '../../services/user.service';
import { Donation } from '../../interfaces/donation';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css'
})
export class CampaignComponent implements OnInit {
  private rawCampaign = this.campaignService.currentCampaign;
  
  // Create a computed signal that ensures non-null campaign
  campaign = computed(() => {
    const c = this.rawCampaign();
    if (!c) throw new Error('No campaign loaded');
    return c;
  });
  donationAmount: number = 0;
  donationCount: number = 0;
  progressPercentage: number = 0;
  campaignsFetched: boolean = false;
  donation: Donation = {
    donationId: 0, 
    donorId: 0, 
    amount: 0, 
    campaignId: 0, 
    donationDate: ''
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private campaignService: CampaignService,
    private donationService: DonationService
  ) {}

  ngOnInit() {
    // Get the campaign ID from URL parameters
    console.log("in ngoninit")
    this.route.queryParams.subscribe(params => {
      const campaignId = params['id'];
      if (campaignId) {
        this.campaignService.getCampaign(campaignId).subscribe({
          next: (success: boolean) => {
            if (!success) {
              this.campaignsFetched = true;
            }
          },
          error: (errorMessage: string) => {
            console.error("Error fetching campaigns:", errorMessage);
          }
        });
      }
    });
    console.log('campaign: ', this.campaign)
  }

  private getDonationCount(campaignId: number) {
    this.donationCount = 0;
  }

  selectAmount(amount: number) {
    this.donationAmount = amount;
  }

  validateDonation(): boolean {
    if (!this.donationAmount || this.donationAmount <= 0) {
      alert('Please select or enter a valid donation amount');
      return false;
    }
    return true;
  }

  onDonate() {
    if (this.validateDonation()) {
      console.log(`Donating amount: ${this.donationAmount}`);
      this.donationService.addDonation(this.donation)
    }
  }

}