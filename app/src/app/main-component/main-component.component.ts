
import { CdkDragDrop, CdkDragEnd, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DayService } from '../services/day.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class MainComponentComponent {


  constructor(private dayService:DayService) {
    
  }

 
}
  