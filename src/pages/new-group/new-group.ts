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
    //public navBar: Navbar,
    public appProv: AppProvider) {

    //if (this.navCtrl.length() > 3)
      //this.navCtrl.remove(2, 2)

    if (this.participants == null)
      this.participants = this.appProv.participants;
  }

  ionViewWillEnter() {
    const contact = this.appProv.contactItem;

    if (contact != null)
    {
      this.participants.push(contact)
      this.appProv.contactItem = null;
    }
  }

  addParticipant()
  {
    this.navCtrl.push(ContactListPage);
  }

  createGroup()
  {
    this.appProv.showLoading('Creating group ...');
    console.log(this.participants);

    this.appProv.postData('group/create/' + this.name,
      { participants: this.participants }).subscribe(res => {
      this.appProv.loading.dismiss();
      this.navCtrl.push(ChatListPage);
    }, (err) => {
      alert(JSON.stringify(err));
      this.appProv.loading.dismiss();
    });
  }

  goBack()
  {
    console.log('going back - ', this.navCtrl.length())
    this.appProv.participants = [];
    this.navCtrl.pop();
  }

  removeParticipant(username: string) {
    for (let i = 0; i < this.participants.length; i++)
    {
      if (this.participants[i].username == username)
        this.participants.splice(i, 1);
    }
  }
}
