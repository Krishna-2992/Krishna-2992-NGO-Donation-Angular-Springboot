import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: "", 
        title: "Homepage", 
        component: HomepageComponent
    },
    {
        path: "login", 
        title: "Login", 
        component: LoginComponent
    }, 
    {
        path: "register", 
        title: "Register", 
        component: RegisterComponent
    }, 
    {
        path: "userDashboard", 
        title: "UserDashboard", 
        component: UserDashboardComponent
    }, 
    
];
