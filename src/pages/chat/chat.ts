import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';


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

    constructor(public navCtrl: NavController, public navParams: NavParams,
      private storage: Storage,  public http: HttpClient, public alertCtrl:AlertController) {
      this.selectedChat = navParams.get('item');
      var msgUrl;

      this.storage.get('username').then((val) => {
        this.currentUser = val;
      });

      if (this.selectedChat == null)
      {
        this.contact = navParams.get('contact');
        alert(JSON.stringify(this.contact));
      }
      else
      {
        if (this.selectedChat.isGroup)
          msgUrl = "http://localhost:5025/messageHandlingApi/Message/groupChat/" + this.selectedChat.groupId;
        else
          msgUrl = "http://localhost:5025/messageHandlingApi/Message/" + this.selectedChat.receiver.username;

        this.storage.get('token').then((token) => {
          this.httpOptions = {
            headers: new HttpHeaders({
              'Authorization': token
            })
          };
      
          this.http.get(msgUrl, this.httpOptions)
            .subscribe(res => {
              this.messages = res;
            }, (err) => {
              const alert = this.alertCtrl.create({
                title: 'Chat Error',
                subTitle: err.message,
                buttons: ['OK']
              });
    
              alert.present();
          });
        });       
      }
    }

    send(event)
    {
      this.http.post("http://localhost:5025/messageHandlingApi/Message/" + 
        this.selectedChat.receiverUsername + '/' + this.message, null,
        this.httpOptions).subscribe(res => {
          this.messages.push({
            text: this.message,
            sender: this.currentUser,
            dateSent: new Date()
          });
    
          this.message = "";
        //alert(JSON.stringify(this.messages))
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