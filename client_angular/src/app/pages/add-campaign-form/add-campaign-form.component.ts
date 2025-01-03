import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { Campaign } from '../../interfaces/campaign';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-add-campaign-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule, 
    MatCard
  ],
  templateUrl: './add-campaign-form.component.html',
  styleUrl: './add-campaign-form.component.css'
})
export class AddCampaignFormComponent {
  campaign: Campaign = {
    campaignId: 0,
    title: '',
    description: '',
    fundRaised: 0,
    targetAmount: 0,
    startDate: '',
    endDate: '',
    status: 'ACTIVE'
  };
  
  submitted = false;
  errorMessage: string = '';

  constructor(private campaignService: CampaignService) {}

  handleSubmit(form: NgForm) {
    this.submitted = true;
    this.errorMessage = '';

    if (form.valid) {
      try {
        this.campaignService.addCampaign(this.campaign).subscribe();
        // You might want to add navigation logic here after successful submission
      } catch (error) {
        this.errorMessage = 'Failed to create campaign. Please try again.';
      }
    }
  }
}