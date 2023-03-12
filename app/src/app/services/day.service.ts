import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as uuid from 'uuid';
import { Day } from '../../app/shared/models/Day';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DayService {
  nameToFilter:any = '';
  notes: Day[] = new Array<Day>();

  constructor(private http:HttpClient) { }
  url = "http://localhost:80/databaza/";




  // days:Day[] = new Array<Day>();
  getAll(id:number) :Observable<Day[]> {
    return this.http.get<Day[]>(this.url + "access.php?user_id="+id);
  }

  createExc( day:Day ): Observable<Day> {
    return this.http.post<Day>(this.url + "create.php",day);
  }

  deleteExc(id:number):Observable<Day>{
    return this.http.delete<Day>(this.url + "delete.php?day_id=" +id);
  }

 
  getData(){
    let headers = {'X-RapidAPI-Key': 'c9be3d61aemshc211e2d3e187665p1cfbeejsnf11b3c8bd011',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'}
    let url=`https://exercisedb.p.rapidapi.com/exercises/name/`+ this.nameToFilter;
    console.log(url);
    return this.http.get(url,{
      headers:headers
    })
    
  }

  updateName(value:any){
    this.nameToFilter = value;
    
  }

  add(param:string,id:number,day:Day) {
    day.day = param;
    day.user_fk = id;
    this.createExc(day).subscribe();


  }


  delete(id:number){
    this.deleteExc(id).subscribe(d => console.log(d))
    
    
  }



} 
