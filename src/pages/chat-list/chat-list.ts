import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

//import { ItemDetailsPage } from '../item-details/item-details';
import { ContactListPage } from '../contact-list/contact-list';
import { ChatPage } from '../chat/chat';
import { NewGroupPage } from '../new-group/new-group';

import { Storage } from '@ionic/storage';
import {AppProvider} from '../../providers/app/app';
import { Chat } from '../../Models/chat';
import { User } from '../../Models/user';

@Component({
  selector: 'page-list',
  templateUrl: 'chat-list.html'
})
export class ChatListPage {
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  chats:any;
  groups:any;
  user:User;
  chat: string = "chats";

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
    this.user = appProv.user;
    this.appProv.showLoading('Retrieving chat list...');

    this.getChats();
  }

  itemTapped(event, item) {
    this.navCtrl.push(ChatPage, {
      item: item,
      chat: this.chat
    });
  }

  getChats()
  {
    this.appProv.getData<Chat[]>('chat')
      .subscribe(res => {
        this.chats = res;
        this.appProv.loading.dismiss();
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        alert.present();
        this.appProv.loading.dismiss();
    });
  }

  getGroups()
  {
    this.appProv.showLoading('Retrieving groups...');

    this.appProv.getData('group')
      .subscribe(res => {
        this.groups = res;
        this.appProv.loading.dismiss();
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        alert.present();
        this.appProv.loading.dismiss();
    });
  }

  newChat(event)
  {
    if (this.chat == 'groups')
      this.navCtrl.push(NewGroupPage);
    else
      this.navCtrl.push(ContactListPage);
  }

  segChange()
  {
    if (this.chat == "chats")
      this.getChats();
    else
      this.getGroups();
  }
}
