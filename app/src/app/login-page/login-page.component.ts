
import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, window } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit{

  isSubmitted = false;
  returnUrl= '';
  constructor(private userService:UserService, 
    private activatedRoute:ActivatedRoute,private router:Router){}
  ngOnInit(): void {
  }


  submit(){
 
    const uname= (<HTMLInputElement>document.querySelector('#email')).value;
    const pwd = (<HTMLInputElement>document.querySelector('#password')).value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(uname =='')alert("please enter user name.");
	
		else if(pwd=='')alert("enter the password");
	
		else if(!filter.test(uname))
		{
			alert("Enter valid email id.");
		}
		else if(pwd.length < 8 || pwd.length >16)
		{
			alert("Password min length is 8 and maximum is 16.");
		}
		else
		{
    
    this.isSubmitted = true;
    
    this.userService.login({email:uname, password:pwd}).subscribe((data:any)=>{
      console.log(data.name);

      this.userService.loggedIn = data.role;
    this.router.navigateByUrl(this.returnUrl);

    })
  }
    }
   
  }
  
