import { Injectable, signal } from '@angular/core';
import { Donation } from '../interfaces/donation';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  // donation = signal<Donation | undefined>;

  // private url = "http://localhost:8080/donations"

  // constructor(private http: HttpClient, private router: Router) { }

  addDonation(donation: Donation) {
    // this.setDonationData(donation)
    console.log("add donaiton")
  }

  // setDonationData(donation: Donation): Observable<any> {
  //     console.log("add donation: ", donation);
  //     console.log("current date: ", Date.now())
  //     return this.http.post(`${this.url}`, {
  //       "donorId": donation.donorId, 
  //       "amount": donation.amount, 
  //       "campaignId": donation.campaignId, 
  //       "donationDate": Date.now()
  //     });
  //   }


}
