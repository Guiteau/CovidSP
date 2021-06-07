import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../models/responses/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {

  userLogged$ = new Subject<string>();

  constructor(private http:HttpClient) { }

  saveUser(userResponse: UserResponse): Promise<boolean>{
    return new Promise((resolve, reject) =>{
      this.http.post(environment.URLUserResponse + 'saveUser', userResponse).subscribe(
        (data: any) =>{
          resolve(true);
        },
        (error: any) =>{
          console.log("Error saving user", error);
          reject(false);
        }
      );
    });
  }

  checkUserLogin(userResponse: UserResponse): Promise<UserResponse>{
    return new Promise((resolve, reject) =>{
      this.http.post(environment.URLUserResponse + 'checkUserLogin', userResponse).subscribe(
        (data: UserResponse) =>{
          resolve(data);
        },
        (error: any) =>{
          console.log("Error user login", error);
          reject(false);
        }
      );
    });
  }

  addUserLogged(user: string){
    this.userLogged$.next(user);
  }

  getUserLogged$(): Observable<string>{
    return this.userLogged$.asObservable();
  }

}
