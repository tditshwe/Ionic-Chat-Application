import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {AppProvider} from '../../providers/app/app';
import { Chat } from '../../Models/chat';

@Component({
    selector: 'chat',
    templateUrl: 'chat.html'
  })
  export class ChatPage {
    selectedChat: any;
    messages: any;
    currentUser: String;
    message: String;
    contact: any;
    receipient: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public http: HttpClient, public alertCtrl:AlertController,
      public appProv: AppProvider
    ) {
      this.selectedChat = navParams.get('item');
      var msgUrl;

      if (this.navCtrl.length() == 3)
        this.navCtrl.remove(2, 1);

      if (this.selectedChat == null)
      {
        this.contact = navParams.get('contact');

        this.selectedChat = {
          is_group: false,
          sender: this.appProv.user.username,
          receiver: this.contact.username,
          chat_receiver: {
            username: this.contact.username,
            name: this.contact.name
          }
        }
      }

      this.currentUser = this.appProv.user.username;

      if (this.selectedChat.sender != this.currentUser)
        this.receipient = this.selectedChat.chat_sender;
      else
        this.receipient = this.selectedChat.chat_receiver;

      if (this.selectedChat.is_group)
        msgUrl = "http://localhost:5025/messageHandlingApi/Message/groupChat/" + this.selectedChat.id;
      else
        msgUrl = "message/" + this.receipient.username;

      this.retrieveMsg(msgUrl);
    }

    retrieveMsg(url)
    {
      this.appProv.showLoading('Waiting for messages...');

      this.appProv.getData<any>(url).subscribe(res => {
        this.messages = res;
        this.appProv.loading.dismiss();
      }, err => {
        const alert = this.alertCtrl.create({
          title: 'Chat Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        this.appProv.loading.dismiss();
      });
    }

    send(event)
    {
      this.appProv.postData("message/" + this.selectedChat.receiver,
      { text: this.message }).subscribe(res => {
          this.messages.push({
            text: this.message,
            sender: this.currentUser,
            dateSent: new Date()
          });

          this.message = "";
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Sending Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        alert.present();
      });
    }
  }
