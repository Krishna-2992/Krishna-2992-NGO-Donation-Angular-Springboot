import { Injectable, signal } from '@angular/core';
import { Donation } from '../interfaces/donation';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { convertTimestampToLocalDate } from '../utils/dateUtils';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  donations = signal<Donation[]>([])
  donation = signal<Donation | undefined>;

  private donationUrl = "http://localhost:8080/donations"
  private campaignUrl = "http://localhost:8080/campaigns"

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  addDonation(donation: Donation): Observable<boolean> {
    console.log("donation", donation)
    console.log("add donaiton")
    if(this.userService.getUser().userId === 0) {
      this.router.navigate(['/login']);
    }
    return this.setDonationData(donation)
  }

  setDonationData(donation: Donation): Observable<any> {
    console.log("add donation: ", donation);
    console.log("current date: ", Date.now().toLocaleString())
    return this.http.post(`${this.donationUrl}`, {
      "donorId": donation.donorId, 
      "amount": donation.amount, 
      "campaignId": donation.campaignId, 
      "donationDate": donation.donationDate
    });
  }

  getDonationList(): Observable<boolean> {
    const donationList = this.http.get<Donation[]>(
      `${this.donationUrl}`, 
      {observe: 'response'}
    )
    console.log(donationList)
    return donationList.pipe(
      map((response: HttpResponse<Donation[]>) => {
        console.log("response: ", response)
        if(response.status === 200 && response.body) {
          console.log("Campaigns fetched - Status: 200")
          localStorage.setItem("campaigns", JSON.stringify(response.body))
          this.donations.set(response.body)
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
