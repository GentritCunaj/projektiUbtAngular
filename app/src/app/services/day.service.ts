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




  // days:Day[] = new Array<Day>();
  getAll() :Observable<Day[]> {
    return this.http.get<Day[]>("http://localhost:5000/data");
  }

  createExc( day:Day ): Observable<Day> {
    return this.http.post<Day>("http://localhost:5000/data",day);
  }

  deleteExc(id:String):Observable<Day>{
    return this.http.delete<Day>("http://localhost:5000/data/"+id);
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



  add(param:string,day:Day) {
    day.day = param;
    const myId = uuid.v4();
    day.id = myId;
    this.createExc(day).subscribe();


  }


  delete(id:string){
    this.deleteExc(id).subscribe(d => console.log(d))
    
    
  }



} 
