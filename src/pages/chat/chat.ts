import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
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
    httpOptions: { headers: HttpHeaders };
    contact: any;
    receipient: any;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public http: HttpClient, public alertCtrl:AlertController,
      public appProv: AppProvider
    ) {
      this.selectedChat = navParams.get('item');
      var msgUrl;

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
      
      //console.log(this.receipient.username + '-' + this.currentUser);

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + appProv.user.api_token
          //'Content-Type': 'application/json'
        })
      };

      this.httpOptions = httpOptions;
    
      if (this.selectedChat.is_group)
        msgUrl = "http://localhost:5025/messageHandlingApi/Message/groupChat/" + this.selectedChat.id;
      else
        msgUrl = "message/" + this.receipient.username;
      
      this.retrieveMsg(msgUrl);     
    }

    retrieveMsg(url)
    {
      this.appProv.getData<any>(url, this.httpOptions).subscribe(res => {
        this.messages = res;
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Chat Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        alert.present();
      });        
    }

    send(event)
    {
      this.http.post("http://localhost:5025/messageHandlingApi/Message/" + 
        this.selectedChat.receiver + '/' + this.message, null,
        this.httpOptions).subscribe(res => {
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