import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DayDataComponent } from './day-data/day-data.component';


import { LoginPageComponent } from './login-page/login-page.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ActivateService } from './services/activate.service';

const routes: Routes = [
  {path:'',component:MainComponentComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[ActivateService]},
  {path:'about',component:AboutpageComponent},
  {path:':id',component:DayDataComponent},
  {path:'contact',component:ContactUsComponent}
  

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

