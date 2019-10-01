import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { LoginPage } from '../login/login';
import {AppProvider} from '../../providers/app/app';

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
              public http: HttpClient,
              public appProv: AppProvider) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  signUp(event, item) {
    let data = {
      username: this.username,
      password: this.password,
      display_name: this.name
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

    this.appProv.postData('user/register', data)
      .subscribe(res => {
        this.navCtrl.push(LoginPage);
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Sign up Error',
          subTitle: err.error,
          buttons: ['OK']
        });

        alert.present();
    });
  }

  logIn() {
    this.navCtrl.push(LoginPage);
  }
}
