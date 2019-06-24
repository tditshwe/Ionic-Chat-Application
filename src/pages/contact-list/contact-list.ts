import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'contact-list',
    templateUrl: 'contact-list.html'
  })
  export class ContactListPage {
    contacts: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: HttpClient)
    {
        this.contacts = []

        this.storage.get('token').then((token) => {
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': token
            })
          };

          this.http.get('http://localhost:5025/messageHandlingApi/Account/AccountList', httpOptions)
            .subscribe(res => {
              this.contacts = res;
            }, (err) => {
              alert(JSON.stringify(err));
          });
        });
    }

    itemTapped(event, item) {
      this.navCtrl.push(ChatPage, {
        contact: item
      });
    }
  }