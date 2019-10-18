import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../Models/user';
import { ContactListPage } from '../contact-list/contact-list';
import { ChatListPage } from '../chat-list/chat-list';
import {AppProvider} from '../../providers/app/app';

@Component({
  selector: 'new-group',
  templateUrl: 'new-group.html'
})
export class NewGroupPage {
  participants: User[];
  name: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appProv: AppProvider) {
    const contact = this.navParams.get('contact');

    if (this.participants == null)
      this.participants = this.appProv.participants;

    if (contact != null)
      this.participants.push(contact)
  }

  addParticipant()
  {
    this.navCtrl.push(ContactListPage, {
      item: 'participant',
    });
  }

  createGroup()
  {
    this.appProv.showLoading('Creating group ...');

    this.appProv.postData('group/create/' + this.name,
      { participants: this.participants }).subscribe(res => {
      this.appProv.loading.dismiss();
      this.navCtrl.push(ChatListPage);
    }, (err) => {
      alert(JSON.stringify(err));
      this.appProv.loading.dismiss();
    });
  }
}
