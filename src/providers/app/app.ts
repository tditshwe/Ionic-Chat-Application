import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppProvider {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) {

  }

  getList<T> (type: string) {
    return this.http.get<T>(this.apiUrl + type)
  }
}
