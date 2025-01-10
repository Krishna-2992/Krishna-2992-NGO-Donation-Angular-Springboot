import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { LoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';
import { headers } from '../../../constants';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = signal<User>({
    userId: 0,
    name: '',
    phone: '',
    email: '',
    address: '',
    loginName: '',
    password: '',
    role: '',
    panNumber: ''
  });
  
  private url = "http://localhost:8080/users"
  private authUrl = "http://localhost:8080/auth"

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(loginUser: LoginUser): Observable<boolean> {
    console.log("UserService -> loginUser");
    return this.getUserData(loginUser).pipe(
      map((response: HttpResponse<Auth>) => {
        if (response.status === 200 && response.body) {
          console.log("Login successful - Status: 200");
          localStorage.setItem("auth", JSON.stringify(response.body))
          // localStorage.setItem("user", JSON.stringify(response.body));
          // this.user.set(response.body);
          this.router.navigate(['/userDashboard']);
          return true;
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error("Login error:", error);
        let errorMessage: string;
        console.log("error.status:  ", error.status)
        
        switch (error.status) {
          case 401:
            errorMessage = "Invalid username or password.";
            break;
          case 403:
            errorMessage = "Account is locked. Please contact support.";
            break;
          case 404:
            errorMessage = "User not found.";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
        return throwError(() => errorMessage);
      })
    );
  }

  registerUser(user: User): Observable<any> {
    return this.setUserData(user);
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    this.user.set({
      userId: 0,
      name: '',
      phone: '',
      email: '',
      address: '',
      loginName: '',
      password: '',
      role: '',
      panNumber: ''
    });
    this.router.navigate(['/']);
  }

  getUserData(loginUser: LoginUser): Observable<HttpResponse<Auth>> {
    return this.http.post<Auth>(
      `${this.authUrl}/login`, 
      loginUser, 
      { observe: 'response' }
    );
  }
  
  setUserData(user: User): Observable<any> {
    console.log("registered user: ", user);
    return this.http.post(`${this.authUrl}/signup`, {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      loginName: user.loginName,
      password: user.password,
      role: user.role,
      panNumber: user.panNumber
    }, {});
  }

  getUser(): User {
    return this.user();
  }
}