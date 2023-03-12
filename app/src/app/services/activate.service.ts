import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../shared/models/User';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ActivateService implements CanActivate{
  returnUrl = '';
  user:User;
  constructor(private userService:UserService, private router:Router) {
    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;

    })
   }
  

  canActivate(){
    if (this.user.role == 'user'){
     alert("You dont have permission to access this page.")
     this.router.navigateByUrl(this.returnUrl);
      return false;
    }  
    else {
      return true;
    }
    

  }

}  
