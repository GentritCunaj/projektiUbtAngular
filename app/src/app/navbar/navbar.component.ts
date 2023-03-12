import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user!:User;
  constructor(private userService:UserService){
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    })

    
  }
  ngOnInit(): void {
      
  }
  logout(){
    this.userService.logout()
  }
 
}