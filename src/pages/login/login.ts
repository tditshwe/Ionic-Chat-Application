import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  selectedItem: any;
  title: any;
  username: String;
  password: String;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.title = 'Mr';
    this.selectedItem = navParams.get('item');
  }

  signIn(event, item) {
    let alert = this.alertCtrl.create({
      title: 'Sign in',
      subTitle: 'Your username is ' + this.username,
      buttons: ['OK']
    });
    alert.present();

    this.navCtrl.push(ListPage);
  }
}