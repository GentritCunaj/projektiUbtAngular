import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Coach } from '../shared/models/Coach';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  url = "http://localhost/databaza/";
  constructor(private http:HttpClient) { }

  getAll() :Observable<Coach[]> {
    return this.http.get<Coach[]>(this.url + "about.php");
  }
}
