
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
		else if(pwd.length < 5 || pwd.length > 5)
		{
			alert("Password min and max length is 5.");
		}
		else
		{
    
    this.isSubmitted = true;
    
      this.userService.login({email:uname, password:pwd}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
      })
    }
   
  }
  
}
