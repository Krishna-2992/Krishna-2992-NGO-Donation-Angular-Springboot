import { Component } from '@angular/core';
import { DonationService } from '../../services/donation.service';
import { error } from 'console';
import { JsonPipe } from '@angular/common';
import { convertTimestampToLocalDate } from '../../utils/dateUtils';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.css'
})
export class DonationsComponent {
  donations = this.donationService.donations;
  
  constructor(private donationService: DonationService) {}

  ngOnInit() {
    this.donationService.getDonationList().subscribe({
      next: (success: boolean) => {
        console.log("success", success)
      }, 
      error: (errorMessage: string) => {
        console.log("error fetching donations", errorMessage)
      }
    })
    console.log("User: ", this.donations());
    console.log("donations: ", this.donations())
  }

  convertDate(timestamp: string): string {
    return convertTimestampToLocalDate(timestamp).formattedDate
  }


}
