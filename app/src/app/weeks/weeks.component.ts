import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DayService } from '../services/day.service';
import { Day } from '../shared/models/Day';


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
  constructor(private dayService: DayService) {
  }

  ngOnInit(): void {
    this.dayService.getAll().subscribe(res => {
      this.notes = res;

      this.notes = this.notes.filter((n)=>{
        return n.day === this.week
      })
     
    });
    
    
    
  }
  

}
