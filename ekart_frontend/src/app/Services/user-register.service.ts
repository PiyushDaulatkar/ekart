import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor(private http: HttpClient) { }

  proceedRegistration(inputdata: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/register', inputdata);
  }
}
