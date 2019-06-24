import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ChatListPage } from '../chat-list/chat-list';
import { SignUpPage } from '../sign-up/sign-up'

import { Storage } from '@ionic/storage';

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
              public http: HttpClient) {
  }

  signIn(event, item) {   
    let data = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:5025/messageHandlingApi/Account/Login', data)
      .subscribe(res => {       
        
      }, (err) => {
        if (err.status == 200)
        {
          this.storage.set('username', this.username);
          this.storage.set('token', 'Bearer ' + err.error.text);
          this.navCtrl.push(ChatListPage);
        }
        else
        {
          const alert = this.alertCtrl.create({
            title: 'Login Error',
            subTitle: err.error,
            buttons: ['OK']
          });

          alert.present();
      }
    });
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }
}