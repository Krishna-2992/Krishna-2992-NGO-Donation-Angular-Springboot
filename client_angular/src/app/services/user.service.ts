import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) { 
    console.log("inside user service")
  }

  loginUser(loginUser: LoginUser): void {
    console.log("UserService -> loginUser")
    console.log("loginUser: ", loginUser)
    this.getUserData(loginUser).subscribe({
      next: (response: HttpResponse<User>) => {
        console.log(response)
        console.log("Success status: " + response.status); 
        localStorage.setItem("user", JSON.stringify(response.body));
        if(response.body){this.user.set(response.body)}
        this.router.navigate(['/userDashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.log("error: " + JSON.stringify(error));
        console.log("error status" + error.status)
        alert("invalid credentials")
      }
    })
  }

  registerUser(user: User): Observable<any> {
    return this.setUserData(user);
}

  logoutUser(): void {
    localStorage.removeItem('user'); // Removes the user object
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
    })
  }

  getUserData(loginUser: LoginUser ): Observable<HttpResponse<User>> {
    return this.http.post<User>('http://localhost:8080/users/login', loginUser , { observe: 'response' });
  }
  
  setUserData(user: User): Observable<any> {
    console.log("registered user: ", user) 
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
    console.log("inside getuser")
    console.log(this.user)
    return this.user();
  }

}
