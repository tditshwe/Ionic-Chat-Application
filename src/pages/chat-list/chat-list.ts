import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

//import { ItemDetailsPage } from '../item-details/item-details';
import { ContactListPage } from '../contact-list/contact-list';

import { Storage } from '@ionic/storage';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  chats:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl:AlertController, private storage: Storage, public http: HttpClient) {
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

    this.storage.get('token').then((token) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': token
        })
      };
  
      this.http.get('http://localhost:5025/messageHandlingApi/Chat', httpOptions)
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
