import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { validate } from 'uuid';
import { IUserRegister } from '../interfaces/IUserRegister';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterPageComponent implements OnInit{
  isSubmitted = false;
  returnUrl = '';
  form : HTMLFormElement;
  username: HTMLInputElement;
  email:HTMLInputElement;
  password:HTMLInputElement;
  confirmpassword:HTMLInputElement;
  address:HTMLInputElement
  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ){
    
  }
  ngOnInit(): void {
      this.form = <HTMLFormElement>document.querySelector('.form');
      this.username= (<HTMLInputElement>document.querySelector('#name'))
      this.email= (<HTMLInputElement>document.querySelector('#email'))
      this.password= (<HTMLInputElement>document.querySelector('#password'))
      this.confirmpassword= (<HTMLInputElement>document.querySelector('#confirmpassword'))
      this.address = (<HTMLInputElement>document.querySelector('#address'))

      this.form.addEventListener('submit',e => {
        console.log('okay')
        e.preventDefault()
        this.validateInputs();
      })
  }

  isValidEmail = (email:string) => {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const emailValue = this.email.value.trim();
    return filter.test(emailValue);
  }

  validateInputs = () => {
    const usernameValue = this.username.value.trim();
    const emailValue = this.email.value.trim();
    const passwordValue = this.password.value.trim();
    const confirmpasswordValue = this.confirmpassword.value.trim();
    const addressValue = this.address.value.trim();
    if (usernameValue === ''){
      this.setError(this.username,'Username is required');
    }
   
    else if (emailValue === ''){
      this.setError(this.email,'Email is required')
    }
    else if (!this.isValidEmail(emailValue)){
      this.setError(this.email,'Provide a valid email address');
    }
    
    
    else if (passwordValue === ''){
      this.setError(this.password, 'Password is required');
    }
    else if (
      passwordValue.length < 8
    ){
      this.setError(this.password,'Password must be at least 8 characters.')
    }


    else if (confirmpasswordValue === ''){
      this.setError(this.confirmpassword,'Please confirm your password')
    }
    else if (
      passwordValue !== confirmpasswordValue 
    ){
      this.setError(this.confirmpassword,'Passwords dont match');
    }
    
    else if (addressValue === ''){
      this.setError(this.address,'Address is required')
    }
    else {
    
      this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
      this.isSubmitted = true;
      const user:IUserRegister = {
        name:usernameValue,
        email:emailValue,
        password:passwordValue,
        confirmPassword:confirmpasswordValue,
        address:addressValue
      }
      this.userService.register(user).subscribe(data=>{

        this.userService.loggedIn = data.role;
      this.router.navigateByUrl(this.returnUrl);
    })
    }
    

  }

  setError = (element:HTMLElement,message:string) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl?.querySelector('.error') as HTMLElement ; 
    errorDisplay.innerText = message;
    inputControl?.classList.add('error');
    inputControl?.classList.remove('success');

  }

  
}
