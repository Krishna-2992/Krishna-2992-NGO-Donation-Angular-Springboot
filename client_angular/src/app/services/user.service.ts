import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { LoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(loginUser: LoginUser): Observable<boolean> {
    console.log("UserService -> loginUser");
    console.log('get user data: ',  this.getUserData(loginUser))
    return this.getUserData(loginUser).pipe(
      map((response: HttpResponse<User>) => {
        if (response.status === 200 && response.body) {
          console.log("Login successful - Status: 200");
          localStorage.setItem("user", JSON.stringify(response.body));
          this.user.set(response.body);
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
  }

  getUserData(loginUser: LoginUser): Observable<HttpResponse<User>> {
    return this.http.post<User>(
      `${this.url}/login`, 
      loginUser, 
      { observe: 'response' }
    );
  }
  
  setUserData(user: User): Observable<any> {
    console.log("registered user: ", user);
    return this.http.post(`${this.url}`, {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      loginName: user.loginName,
      password: user.password,
      role: user.role,
      panNumber: user.panNumber
    });
  }

  getUser(): User {
    return this.user();
  }
}