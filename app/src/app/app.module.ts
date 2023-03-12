import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponentComponent } from './main-component/main-component.component';

import { WeeksComponent } from './weeks/weeks.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';


import { LoginPageComponent } from './login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { FooterComponent } from './footer/footer.component';
import { DayDataComponent } from './day-data/day-data.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivateService } from './services/activate.service';



@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,

    WeeksComponent,

    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    AboutpageComponent,
    FooterComponent,
    DayDataComponent,
    ContactUsComponent,
    DashboardComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    })
  ],
  providers: [ActivateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
