import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { ChatPage } from '../chat/chat';
import { Storage } from '@ionic/storage';
import {AppProvider} from '../../providers/app/app';
import { isRightSide } from 'ionic-angular/umd/util/util';
import { NewGroupPage } from '../new-group/new-group';

@Component({
    selector: 'contact-list',
    templateUrl: 'contact-list.html'
  })
  export class ContactListPage {
    contacts: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public http: HttpClient,
      public appProv: AppProvider)
    {
      this.contacts = []
      this.appProv.showLoading('Waiting for contact list...');

      appProv.getData<any>('user/contacts')
        .subscribe(res => {
          this.contacts = res;
          this.appProv.loading.dismiss();
        }, (err) => {
          alert(JSON.stringify(err));
          this.appProv.loading.dismiss();
      });
    }

    itemTapped(event, item) {

      const page = this.navParams.get('item') == 'participant' ? NewGroupPage : ChatPage;

      this.navCtrl.push(page, {
        contact: item
      });
    }
  }
