import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { ContactService } from '../services/contact.service';
import { DayService } from '../services/day.service';
import { UserService } from '../services/user.service';
import { Coach } from '../shared/models/Coach';
import { Contact } from '../shared/models/Contact';
import {Day} from '../shared/models/Day'
import { User } from '../shared/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DashboardComponent implements AfterViewInit {
 
  contacts:Contact[];
  users:User[];
  trainers:Coach[];
  countContacts:number;
  countUsers:number;
  countCoaches:number;
  updatedRole:string;
  constructor(private contactService:ContactService,private userService:UserService,private dayService:DayService,private coachService:CoachService){
    
  }

  updateRole(id:number,role:string):void {
    console.log(id,role);
    if (role == 'admin'){
      this.updatedRole = 'user';
      console.log('okay')
      this.userService.setRole({ user_id:id,role:this.updatedRole});
    }
    if (role == 'user'){
      this.updatedRole = 'admin';
      console.log('oka1y')
      this.userService.setRole({ user_id:id,role:this.updatedRole});
    }



  }

  ngAfterViewInit(): void {
        const menuicn = document.querySelector(".menuicn") as HTMLElement;
        const nav = document.querySelector(".navcontainer") as HTMLElement;
  
        menuicn.addEventListener("click",()=>
        {
              nav.classList.toggle("navclose");
        })

      this.contactService.getMessages().subscribe((res:any) => {
          this.contacts = res.data;
          this.countContacts =  this.contacts.length;
          
          
      })

      this.userService.getAllUsers().subscribe((res:any) => {
        this.users = res.data;
        console.log(this.users)
        this.countUsers = this.users.length;

      })

      this.coachService.getAll().subscribe((res:any)=>{
        this.trainers = res.data;
        this.countCoaches = this.trainers.length;
      })


  }





}
