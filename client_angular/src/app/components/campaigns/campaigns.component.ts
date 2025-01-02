import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { CommonModule, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

export interface Campaign {
    campaignId: number;
    title: string;
    description: string;
    fundRaised: string;
    targetAmount: string;
    startDate: string;
    endDate: string;
    status: 'ACTIVE' | 'FULFILLED' | 'ENDED';
    icon?: string;
}

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [JsonPipe, NgFor, NgIf, RouterLink, CommonModule, DatePipe],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.css'
})
export class CampaignsComponent implements OnInit {
  campaigns = this.campaignService.campaigns;
  campaignsFetched: boolean = false;

  user = this.userService.user;

  constructor(private campaignService: CampaignService, private userService: UserService) {}

  ngOnInit() {
    this.campaignService.getCampaignList().subscribe({
      next: (success: boolean) => {
        if (!success) {
          this.campaignsFetched = true;
        }
      },
      error: (errorMessage: string) => {
        console.error("Error fetching campaigns:", errorMessage);
      }
    });
    console.log("user: ", this.user())
  }

  getStatusClass(status: 'ACTIVE' | 'FULFILLED' | 'ENDED'): string {
    switch(status) {
      case 'FULFILLED':
        return 'fulfilled-campaign';
      case 'ACTIVE':
        return 'active-campaign';
      case 'ENDED':
        return 'inactive-campaign';
      default:
        return '';
    }
  }

  getStatusText(status: 'ACTIVE' | 'FULFILLED' | 'ENDED'): string {
    switch(status) {
      case 'FULFILLED':
        return 'Campaign Completed';
      case 'ACTIVE':
        return 'Ongoing Campaign';
      case 'ENDED':
        return 'Campaign Ended';
      default:
        return '';
    }
  }

  calculateProgress(fundRaised: string, targetAmount: string): number {
    const raised = parseFloat(fundRaised.replace(/[₹,]/g, ''));
    const target = parseFloat(targetAmount.replace(/[₹,]/g, ''));
    return (raised / target) * 100;
  }

  formatCurrency(amount: string): string {
    if (!amount.includes('₹')) {
      return `₹${amount}`;
    }
    return amount;
  }
}