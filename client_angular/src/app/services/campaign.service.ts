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

  campaigns = signal<Campaign[]>([])
  currentCampaign = signal<Campaign | undefined>(undefined);

  private url = "http://localhost:8080/campaigns"

  constructor(private http: HttpClient, private router: Router) { }

  addCampaign(campaign: Campaign): Observable<any> {
    return this.setCampaignData(campaign);
  }

  setCampaignData(campaign: Campaign): Observable<any> {
    console.log("add campaign: ", campaign);
    return this.http.post(`${this.url}`, {
      "title": campaign.title,
      "description": campaign.description,
      "fundRaised": campaign.fundRaised,
      "targetAmount": campaign.targetAmount,
      "startDate": campaign.startDate,
      "endDate": campaign.endDate,
      "status": campaign.status,
      "icon": campaign.icon
    });
  }

  getCampaign(campaignId: number): Observable<boolean> {
    console.log("campaign fetching: ", campaignId)
    const campaign = this.http.get<Campaign>(
      `${this.url}/${campaignId}`, 
      {observe: 'response'}
    )
    console.log(campaign)
    return campaign.pipe(
      map((response: HttpResponse<Campaign>) => {
        console.log("response", response)
        if(response.status === 200 && response.body) {
          console.log("Campaigns fetched - Status: 200")
          localStorage.setItem("campaign", JSON.stringify(response.body))
          this.currentCampaign.set(response.body)
          return true;
        }
        return false
      }), 
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string;
        console.log("error.status:  ", error.status)
        
        switch (error.status) {
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
        return throwError(() => errorMessage);
      })
    )
  }

  getCampaignList(): Observable<boolean> {
    console.log("fetching campaigns")
    const campaignList = this.http.get<Campaign[]>(
      `${this.url}`, 
      {observe: 'response'}
    )
    console.log(campaignList)
    return campaignList.pipe(
      map((response: HttpResponse<Campaign[]>) => {
        console.log("response: ", response)
        if(response.status === 200 && response.body) {
          console.log("Campaigns fetched - Status: 200")
          localStorage.setItem("campaigns", JSON.stringify(response.body))
          this.campaigns.set(response.body)
          return true;
        }
        return false
      }), 
      catchError((error: HttpErrorResponse) => {
        console.error("Login error:", error);
        let errorMessage: string;
        console.log("error.status:  ", error.status)
        
        switch (error.status) {
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
        return throwError(() => errorMessage);
      })
    )
  }
}
