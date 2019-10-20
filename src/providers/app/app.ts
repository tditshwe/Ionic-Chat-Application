import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../Models/user';

@Injectable()
export class AppProvider {
  private apiUrl = 'http://localhost:8000/api/';
  currentUsername: string;
  httpOptions: { headers: HttpHeaders };
  loading: Loading;
  user:User;
  participants: User[] = [];
  chatType: string;
  currentGroup: any;

  constructor(public http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {

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

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showLoading(content = 'Please wait...') {
    this.loading = this.loadingCtrl.create({
      content: content,
      dismissOnPageChange: false
    });
    this.loading.present();
  }
}
