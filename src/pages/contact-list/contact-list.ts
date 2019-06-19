import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'contact-list',
    templateUrl: 'contact-list.html'
  })
  export class ContactListPage {
    contacts: Array<{name: string, status: string}>;

    constructor(public navCtrl: NavController, public navParams: NavParams)
    {
        this.contacts = []

        for(let i = 1; i < 22; i++) {
            this.contacts.push({
              name: 'Contact ' + i,
              status: 'My status quo #' + i
            });
        }
    }
  }