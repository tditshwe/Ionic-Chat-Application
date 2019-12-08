import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ChatListPage } from '../chat-list/chat-list';
import { SignUpPage } from '../sign-up/sign-up';

import { Storage } from '@ionic/storage';
import {AppProvider} from '../../providers/app/app';
import { User } from '../../Models/user'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: String;
  password: String;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl:AlertController,
    public storage: Storage,
    public http: HttpClient,
    public appProv: AppProvider
  ) { }

  signIn(event, item) {
    let data = {
      username: this.username,
      password: this.password
    };

    this.appProv.showLoading('Logging in...')

    this.appProv.postData<User>('user/signin', data).subscribe(res => {
      this.appProv.currentUsername = res.username;
      this.appProv.user = res;
      this.appProv.setTokenHeader(res.api_token);
      this.storage.set('user', res);
      //console.log(res.username);
      this.navCtrl.push(ChatListPage);
      this.appProv.loading.dismiss();
    },
    (err) => {
      const alert = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: err.message,
        buttons: ['OK']
      });

      this.appProv.loading.dismiss();
      alert.present();
    });
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }
}
