import { Component, computed, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../../services/donation.service';
import { UserService } from '../../services/user.service';
import { Donation } from '../../interfaces/donation';
import { ErrorStateMatcher } from '@angular/material/core';

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
    private donationService: DonationService, 
    private router: Router
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
      this.donation.amount = this.donationAmount;
      this.donation.donorId = this.userService.getUser().userId;
      this.donation.campaignId = this.campaign().campaignId
      this.donation.donationDate = String(Date.now())

      this.donationService.addDonation(this.donation).subscribe({
        next: (success: boolean) => {
          if (success) {
            alert("payment gateway goes here :)")
            alert("donation of money successful.")
            this.campaignService.updateCampaign(this.donationAmount, this.campaign().campaignId).subscribe({
              next: (success: boolean) => {
                alert("campaign data updated successfully")
                this.router.navigate(['/userDashboard']);
              }, 
              error: (errorMessage: string) => {
                alert(errorMessage)
              }
            })
          } else {
            alert("An unexpected error occurred during login.");
          }
        },
        error: (errorMessage: string) => {
          alert(errorMessage)
        } 
      });

    }
  }
}