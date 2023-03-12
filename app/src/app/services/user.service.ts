import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../interfaces/IUserLogin';
import { IUserRegister } from '../interfaces/IUserRegister';
import { IUserUpdate } from '../interfaces/IUserUpdate';
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

  loggedIn:string;

  setRoleF(userUpdate:IUserUpdate):Observable<User>{
    return this.http.put<User>("http://localhost/databaza/setRole.php",userUpdate);

  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>("http://localhost/databaza/login.php",userLogin).pipe(
      tap({
        next: (user:any) => {
          console.log(user)
          this.setUserToLocalStorage(user.data);
          this.userSubject.next(user.data);
          this.toastrService.success(
            `Welcome to FitnessApp ${user.data.name}!`,
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
    return this.http.post<User>("http://localhost/databaza/register.php",userRegister).pipe(
      tap({
        
        next:(user:any)=>{
          console.log(user)
          this.setUserToLocalStorage(user.data);
          this.userSubject.next(user.data);
          this.toastrService.success(
            `Welcome to FitnessApp ${user.data.name}`,
            "Register Succsesful"
          )

        },
        error:(err)=>{
          this.toastrService.error(err.error,'Register Failed')
        }
      })
    )
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>("http://localhost/databaza/getUsers.php");
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

  setRole(userUpdate:IUserUpdate){
   this.setRoleF(userUpdate).subscribe((data:any) => console.log(data))
  }

}
