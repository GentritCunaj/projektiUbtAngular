import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation,ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormGroup, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DayService } from '../services/day.service';
import { Day } from '../shared/models/Day';

import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map,startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-day-data',
  templateUrl: './day-data.component.html',
  styleUrls: ['./day-data.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class DayDataComponent implements OnInit,OnChanges {

  
  // @ViewChild('inputRef',{read:NgModel}) value:NgModel | undefined;
  notes: Day[] = new Array<Day>();
  note: Day = new Day();
  idParams = '';
  dataStored = Array<any>();
  keyVal = '';
  myControl = new FormControl();
  filteredOptions: Observable<any> | undefined;
  workoutGroup: FormGroup<any>;
  ids = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  
  user!:User;
  constructor(private dayService: DayService, private route:ActivatedRoute,private router: Router,private userService:UserService) {
    this.route.params.subscribe(params => {
    
      this.idParams = params['id'];
      if (this.ids.indexOf(this.idParams) == -1 ){
        this.router.navigateByUrl('error');
      }

      userService.userObservable.subscribe((newUser)=>{
        this.user = newUser;
      })
      
      
    })
    console.log(this.idParams);
    
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
  debounce:number = 400;

  callingFunction() {
    console.log(this.workoutGroup.value);
   }
  ngOnInit(): void {
  
    this.workoutGroup = new FormGroup({
      description: new FormControl(''),
      reps: new FormControl(''),
      weight: new FormControl('')

    });
    
    this.myControl.valueChanges.subscribe(x => console.log("x eshte ",x));
    
    this.dayService.getAll(this.user.user_id || 0).subscribe((res:any) => {
      this.notes = res.data;
      this.notes = this.notes.filter((n)=>{
        return n.day === this.idParams
      })
    });

   
   

    this.myControl.valueChanges.pipe(
      filter(data => data == undefined || data.length > 5),
      (debounceTime(this.debounce),distinctUntilChanged())
      
    ).subscribe(query => {
      console.log(query);
      this.dayService.updateName(query);
      this.dayService.getData().subscribe(data => {
      
        let res= Object.values(data);
        res = res.map((r)=>r.name);
        this.dataStored = res;
        console.log(this.dataStored);
        
      })
      
    })

    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      
      startWith(''),
      map(value => this._filter(value))
    )
  

  }

  private _filter(value:string){
    const filterValue = value.toLowerCase();
    return this.dataStored.filter(d => d.toString().toLowerCase().includes(filterValue));
  
  }


  onSubmit(){
    this.workoutGroup.value['description'] = this.myControl.value;
    this.dayService.add(this.idParams,this.user.user_id || 0,this.workoutGroup.value);
    this.notes.push(this.workoutGroup.value)
  }
   

  onDelete(id:number ){
    this.dayService.delete(id)
    console.log(this.idParams);
    this.router.navigateByUrl("/")
    console.log("ondelete")
  }  

 

}
