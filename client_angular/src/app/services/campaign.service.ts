import { Injectable, signal } from '@angular/core';
import { Campaign } from '../interfaces/campaign';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  campaigns = signal<Campaign[]>([]);
  currentCampaign = signal<Campaign | undefined>(undefined);
  private url = "http://localhost:8080/campaigns";

  constructor(private http: HttpClient, private router: Router) {}

  addCampaign(campaign: Campaign): Observable<any> {
    return this.http.post(
      `${this.url}`, 
      {
        "title": campaign.title,
        "description": campaign.description,
        "fundRaised": campaign.fundRaised,
        "targetAmount": campaign.targetAmount,
        "startDate": campaign.startDate,
        "endDate": campaign.endDate,
        "status": campaign.status,
        "icon": campaign.icon
      }, 
      { withCredentials: true }
    );
  }

  getCampaign(campaignId: number): Observable<boolean> {
    console.log("campaign fetching: ", campaignId);
    return this.http.get<Campaign>(
      `${this.url}/${campaignId}`,
      {
        withCredentials: true,
        observe: 'response'
      }
    ).pipe(
      map((response: HttpResponse<Campaign>) => {
        console.log("response", response);
        if(response.status === 200 && response.body) {
          console.log("Campaign fetched - Status: 200");
          localStorage.setItem("campaign", JSON.stringify(response.body));
          this.currentCampaign.set(response.body);
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  getCampaignList(): Observable<boolean> {
    console.log("fetching campaigns");
    return this.http.get<Campaign[]>(
      `${this.url}`,
      {
        withCredentials: true,
        observe: 'response'
      }
    ).pipe(
      map((response: HttpResponse<Campaign[]>) => {
        console.log("response: ", response);
        if(response.status === 200 && response.body) {
          console.log("Campaigns fetched - Status: 200");
          localStorage.setItem("campaigns", JSON.stringify(response.body));
          this.campaigns.set(response.body);
          return true;
        }
        return false;
      }),
      catchError(this.handleError)
    );
  }

  updateCampaign(amount: number, campaignId: number): Observable<boolean> {
    return this.updateCampaignFundRaised(amount, campaignId)
  }

  updateCampaignFundRaised(amount: number, campaignId: number): Observable<any> {
    console.log("updating campaign fund raised: ", amount, " ", campaignId);
    return this.http.patch(
      `${this.url}?campaignId=${campaignId}&amount=${amount}`,
      {},  // Empty body object
      { withCredentials: true }  
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Error:", error);
    let errorMessage: string;
    
    switch (error.status) {
      case 500:
        errorMessage = "Server error. Please try again later.";
        break;
      default:
        errorMessage = "An unexpected error occurred. Please try again.";
    }
    return throwError(() => errorMessage);
  }
}
