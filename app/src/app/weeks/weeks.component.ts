import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DayService } from '../services/day.service';
import { UserService } from '../services/user.service';
import { Day } from '../shared/models/Day';
import { User } from '../shared/models/User';


@Component({
  selector: 'app-weeks',
  templateUrl: './weeks.component.html',
  styleUrls: ['./weeks.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class WeeksComponent{

  @Input() week = '';


  nightModeBoolean = true;

  nightMode() {

    this.nightModeBoolean = !this.nightModeBoolean;
   
  }
  notes: Day[] = new Array<Day>();
  note: Day = new Day();
  idParams = ''
  user:User;

  constructor(private dayService: DayService,private userService:UserService) {
    this.userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;

    })
   
  }
  
  

  ngOnInit(): void {
    this.dayService.getAll(this.user.user_id).subscribe((res:any) => {

      this.notes = res.data;

      this.notes = this.notes.filter((n)=>{
        return n.day === this.week
      })
     
    });
    
    
    
  }
  

}
