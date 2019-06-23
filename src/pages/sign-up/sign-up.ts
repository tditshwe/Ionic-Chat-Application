import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-signup',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  username: String;
  password: String;
  passConfirm: String;
  name: String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public storage: Storage,
              public http: HttpClient) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  signUp(event, item) {
    let data = {
      username: this.username,
      password: this.password,
      name: this.name
    };

    if (this.passConfirm != this.password)
    {
        const alert = this.alertCtrl.create({
            title: 'Password Mismatch',
            subTitle: "Passwords don't match",
            buttons: ['OK']
        });

        alert.present();
        return;
    }

    this.http.post('http://localhost:5025/messageHandlingApi/Account/', data)
      .subscribe(res => {       
        this.navCtrl.push(LoginPage);
      }, (err) => {
        /*if (err.status == 200)
        {
          this.storage.set('token', 'Bearer ' + err.error.text);
          this.navCtrl.push(ChatListPage);
        }*/
        //else
        //{
          const alert = this.alertCtrl.create({
            title: 'Sign up Error',
            subTitle: err.error,
            buttons: ['OK']
          });

          alert.present();
      //}
    });
  }
}