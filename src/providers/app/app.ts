import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/user';

@Injectable()
export class AppProvider {
  private apiUrl = 'http://localhost:8000/api/';
  currentUsername: string;
  user: User;

  constructor(public http: HttpClient) {

  }

  getData<T> (type: string, httpOptions = null) {
    return this.http.get<T>(this.apiUrl + type, httpOptions);
  }

  postData<T> (type: string, data: any) {
    return this.http.post<T>(this.apiUrl + type, data);
  }
}
