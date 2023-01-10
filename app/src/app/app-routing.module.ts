import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginPageComponent } from './login-page/login-page.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {path:'',component:MainComponentComponent},

  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

