import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppProvider} from '../../providers/app/app';
import { User } from '../../Models/user'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;
  edited: boolean = false;
  icon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appProv: AppProvider) {
    this.user = this.appProv.user;
    this.icon =
  }

  profileEdited()
  {
    this.edited = true;
  }

  saveChanges()
  {
    this.edited = false;
  }
}
