import { Injectable, signal } from '@angular/core';
import { Donation } from '../interfaces/donation';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { convertTimestampToLocalDate } from '../utils/dateUtils';
import { headers } from '../../../constants';
@Injectable({
  providedIn: 'root'
})
export class DonationService {

  donations = signal<Donation[]>([])
  donation = signal<Donation | undefined>;

  private donationUrl = "http://localhost:8080/donations"
  private campaignUrl = "http://localhost:8080/campaigns"
  private paymentUrl = "http://localhost:8080/payment";

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

   // Add this method for creating Razorpay order
   createOrder(amount: number): Observable<any> {
    return this.http.get(`${this.paymentUrl}/create-order?amount=${amount}`);
  }

  // Add this method for verifying payment
  verifyPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('razorpay_payment_id', paymentData.razorpay_payment_id);
    body.set('razorpay_order_id', paymentData.razorpay_order_id);
    body.set('razorpay_signature', paymentData.razorpay_signature);

    return this.http.post(`${this.paymentUrl}/verify`, body.toString(), { headers });
  }

  // Modify addDonation to handle payment first
  addDonation(donation: Donation): Observable<any> {
    console.log("donation", donation);
    if (this.userService.getUser().userId === 0) {
      this.router.navigate(['/login']);
      return throwError(() => 'User not logged in');
    }

    // Create Razorpay order first
    return this.createOrder(donation.amount).pipe(
      map(orderData => {
        return {
          donation: donation,
          orderData: orderData
        };
      })
    );
  }

  // Add this method to save donation after payment
  saveDonation(donation: Donation): Observable<any> {
    return this.setDonationData(donation);
  }

  // Your existing methods remain the same
  setDonationData(donation: Donation): Observable<any> {
    console.log("add donation: ", donation);
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
