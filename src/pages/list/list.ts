import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  loginItem: {title: string, note: string, icon: string}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.loginItem = {
      title: 'Login',
      note: 'This is a login page',
      icon: this.icons[1]
    };
    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    this.items.push(this.loginItem);
  }

  itemTapped(event, item) {
    if (item == this.loginItem)
      this.navCtrl.push(LoginPage, {
        item: item
      });
    else
      this.navCtrl.push(ItemDetailsPage, {
        item: item
      });
  }
}
