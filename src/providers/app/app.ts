import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppProvider {
  private apiUrl = 'http://localhost:8000/api/';
  currentUsername: string;

  constructor(public http: HttpClient) {

  }

  getData<T> (type: string) {
    return this.http.get<T>(this.apiUrl + type);
  }

  postData<T> (type: string, data: any) {
    console.log(this.apiUrl + type);
    return this.http.post<T>(this.apiUrl + type, data);
  }
}
