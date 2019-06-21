import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

//import { ListPage } from '../list/list';

import { Storage } from '@ionic/storage';


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
              public alertCtrl:AlertController,
              public storage: Storage,
              public http: HTTP) {
    // If we navigated to this page, we will have an item available as a nav param
    this.title = 'Mr';
    this.selectedItem = navParams.get('item');
  }

  signIn(event, item) {
    this.storage.set('username', this.username);

    this.http.post('http://localhost:5025/messageHandlingApi/Account/Login',
      {
        username: this.username,
        password: this.password
      },
    {})
    .then(data => {
      let alert = this.alertCtrl.create({
        title: 'Sign in',
        subTitle: JSON.stringify(data),
        buttons: ['OK']
      })
      alert.present();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      //console.log(error.headers);
    });

    //this.navCtrl.push(ListPage);
  }
}