import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../interfaces/IContact';
import { Contact } from '../shared/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  url = "http://localhost/databaza/";
  
  sendForm( contact:IContact ): Observable<Contact> {
    return this.http.post<Contact>(this.url + "contact.php",contact);
  }

  getMessages():Observable<Contact[]>{
    return this.http.get<Contact[]>(this.url + 'messages.php');
  }
}
