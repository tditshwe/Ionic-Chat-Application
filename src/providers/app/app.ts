import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppProvider {
  private apiUrl = 'http://localhost:8000/api/';
  currentUsername: string;
  user: User;
  httpOptions: { headers: HttpHeaders };

  constructor(public http: HttpClient) {

  }

  setTokenHeader(token) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
        //'Content-Type': 'application/json'
      })
    };
  }

  getData<T> (type: string) {
    return this.http.get<T>(this.apiUrl + type, this.httpOptions);
  }

  postData<T> (type: string, data: any) {
    return this.http.post<T>(this.apiUrl + type, data, this.httpOptions);
  }
}
