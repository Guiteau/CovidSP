import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionResponse } from '../models/responses/SessionResponse';

@Injectable({
  providedIn: 'root'
})
export class SessionResponseService {

  constructor(private http:HttpClient) {}

  saveSession(sessionResponse: SessionResponse): Promise<number>{
    return new Promise((resolve, reject) =>{
      this.http.post(environment.URLSessionResponse + 'saveSession', sessionResponse).subscribe(
        (data: any) =>{
          resolve(data);
        },
        (error: any) =>{
          console.log('Error saving session', error);
          reject(-1);
        }
      );
    });
  }

}
