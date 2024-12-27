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

  private url = "http://localhost:8080/campaigns"

  constructor(private http: HttpClient, private router: Router) { }

  

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
