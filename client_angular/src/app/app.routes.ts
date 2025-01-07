import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AddCampaignFormComponent } from './pages/add-campaign-form/add-campaign-form.component';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { DonationsComponent } from './pages/donations/donations.component';

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
    {
        path: "addCampaignForm", 
        title: "AddCampaignForm", 
        component: AddCampaignFormComponent
    }, 
    {
        path: "campaign",
        title: "Campaign", 
        component: CampaignComponent
    },   
    {
        path: "donations",
        title: "Donations", 
        component: DonationsComponent
    },
];
