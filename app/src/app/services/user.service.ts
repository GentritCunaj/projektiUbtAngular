import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../interfaces/IUserLogin';
import { IUserRegister } from '../interfaces/IUserRegister';
import { User } from '../shared/models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStorage());
  public userObservable: Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>("http://localhost:5000/userdata/login",userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to FitnessApp ${user.name}!`,
            "Login Successful"
          )
        },
        error: (err) => {
          this.toastrService.error(err.error,"Login Failed")
          
        }
      })
    );
  }

  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>("http://localhost:5000/userdata/register",userRegister).pipe(
      tap({
        next:(user)=>{
          console.log('ktu')
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to FitnessApp ${user.name}`,
            "Register Succsesful"
          )

        },
        error:(err)=>{
          this.toastrService.error(err.error,'Register Failed')
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User())
    localStorage.removeItem('user')
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem('user',JSON.stringify(user))
  }

  private getUserToLocalStorage():User {
    const userJson = localStorage.getItem('user')
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
