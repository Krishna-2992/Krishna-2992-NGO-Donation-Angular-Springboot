import { Component, computed, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';
import { FormsModule } from '@angular/forms';
import { DonationService } from '../../services/donation.service';
import { UserService } from '../../services/user.service';
import { Donation } from '../../interfaces/donation';

declare var Razorpay: any;

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

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);

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

  onDonate() {
    if (this.validateDonation()) {
      console.log(`Donating amount: ${this.donationAmount}`);
      this.donation.amount = this.donationAmount;
      this.donation.donorId = this.userService.getUser().userId;
      this.donation.campaignId = this.campaign().campaignId;
      this.donation.donationDate = String(Date.now());

      // Modified donation flow to include payment
      this.donationService.addDonation(this.donation).subscribe({
        next: (response) => {
          this.handlePayment(response.orderData, response.donation);
        },
        error: (errorMessage: string) => {
          alert(errorMessage);
        }
      });
    }
  }

  private handlePayment(orderData: any, donation: Donation) {
    const options = {
      key: orderData.razorpayKeyId,
      amount: orderData.amount * 100,
      currency: orderData.currency,
      name: "NGO Donation",
      description: `Donation for ${this.campaign().title}`,
      order_id: orderData.orderId,
      handler: (response: any) => {
        this.verifyPaymentAndSaveDonation(response, donation);
      },
      prefill: {
        name: this.userService.getUser().name || "Anonymous",
        email: this.userService.getUser().email || "",
        contact: ""
      },
      theme: {
        color: "#3399cc"
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled');
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  private verifyPaymentAndSaveDonation(paymentResponse: any, donation: Donation) {
    this.donationService.verifyPayment(paymentResponse).subscribe({
      next: (response) => {
        if (response.success) {
          // Save donation after successful payment
          this.donationService.saveDonation(donation).subscribe({
            next: (success: boolean) => {
              // Update campaign amount
              this.campaignService.updateCampaign(donation.amount, this.campaign().campaignId).subscribe({
                next: (success: boolean) => {
                  alert("Donation successful!");
                  this.router.navigate(['/userDashboard']);
                },
                error: (errorMessage: string) => {
                  alert("Donation recorded but campaign update failed: " + errorMessage);
                }
              });
            },
            error: (errorMessage: string) => {
              alert("Payment successful but donation recording failed: " + errorMessage);
            }
          });
        } else {
          alert("Payment verification failed");
        }
      },
      error: (error) => {
        console.error('Payment verification error:', error);
        alert("Payment verification failed");
      }
    });
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
}