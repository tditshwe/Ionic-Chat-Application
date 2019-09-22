import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

//import { ItemDetailsPage } from '../item-details/item-details';
import { ContactListPage } from '../contact-list/contact-list';
import { ChatPage } from '../chat/chat';

import { Storage } from '@ionic/storage';
import {AppProvider} from '../../providers/app/app';
import { Chat } from '../../Models/chat';

@Component({
  selector: 'page-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  chats:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl:AlertController, private storage: Storage, public http: HttpClient,
    public appProv: AppProvider
  ) {
    //this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    //'american-football', 'boat', 'bluetooth', 'build'];

    /*this.items = [];
    for(let i = 1; i < 22; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/

    console.log(appProv.user);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + appProv.user.api_token
        //'Content-Type': 'application/json'
      })
    };

    this.appProv.getData<Chat[]>('chat', httpOptions)
      .subscribe(res => {
        this.chats = res;
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        alert.present();
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ChatPage, {
      item: item
    });
  }

  newChat(event)
  {
    this.navCtrl.push(ContactListPage);
  }
}
