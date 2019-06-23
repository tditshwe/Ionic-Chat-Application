import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { ChatPage } from '../chat/chat';

@Component({
    selector: 'contact-list',
    templateUrl: 'contact-list.html'
  })
  export class ContactListPage {
    contacts: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient)
    {
        this.contacts = []

        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVzZXIxIiwicm9sZSI6Ikdyb3VwQWRtaW4iLCJuYmYiOjE1NjExODkzMjMsImV4cCI6MTU2MTc5NDEyMywiaWF0IjoxNTYxMTg5MzIzfQ.Auafe_h46kUfK7BCJ9QVZ9-9KRf3tjhaAOWQDZETRq8'
          })
        };

        this.http.get('http://localhost:5025/messageHandlingApi/Account/AccountList', httpOptions)
          .subscribe(res => {
            this.contacts = res;
          }, (err) => {
            alert(JSON.stringify(err));
        });
    }

    itemTapped(event, item) {
      this.navCtrl.push(ChatPage, {
        contact: item
      });
    }
  }