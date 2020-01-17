import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {AppProvider} from '../../providers/app/app';
import { GroupMenuPage } from '../../pages/group-menu/group-menu';
import { ContactListPage } from '../contact-list/contact-list';

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
    chatType: string;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public http: HttpClient, public alertCtrl:AlertController,
      public appProv: AppProvider,
      public popoverCtrl: PopoverController
    ) {
      this.selectedChat = navParams.get('item');
      var msgUrl: string;
      this.currentUser = this.appProv.user.username;
      this.contact = navParams.get('contact');

      console.log(this.navCtrl.length());

      if (this.navCtrl.length() == 2)
        this.navCtrl.remove(1, 1);
      else if (this.navCtrl.length() == 3)
        this.navCtrl.remove(2, 2);

      if (this.appProv.chatType == 'groups')
      {
        this.selectedChat = this.selectedChat == null ? this.appProv.currentGroup : this.selectedChat;

        if (this.selectedChat != null)
          this.appProv.currentGroup = this.selectedChat;

        this.chatType = 'groups'
        msgUrl = "message/groups/" + this.selectedChat.id;
      }
      else
      {
        if (this.selectedChat == null)
        {
          this.selectedChat = {
            senderUsername: this.appProv.user.username,
            receiverUsername: this.contact.username,
            receiver: {
              username: this.contact.username,
              name: this.contact.display_name
            }
          }
        }

        if (this.selectedChat.senderUsername != this.currentUser)
          this.receipient = this.selectedChat.sender;
        else
          this.receipient = this.selectedChat.receiver;

        msgUrl = "message/" + this.receipient.username;
      }

      this.retrieveMsg(msgUrl);
    }

    ionViewWillEnter() {
      if (this.appProv.chatType == 'groups')
      {
        const contact = this.appProv.contactItem;

        if (contact != null)
        {
          this.contact = contact;
          this.addParticipant()
          this.appProv.contactItem = null;
        }
      }
    }

    ionViewWillUnload	() {
      console.log('View unloaded')
      this.appProv.participants = [];
    }

    retrieveMsg(url: string)
    {
      this.appProv.showLoading('Waiting for messages...');
      console.log(url)
      this.appProv.getData<any>(url).subscribe(res => {
        this.messages = res;
        console.log(this.messages)
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
      var url: string;

      if (this.chatType == 'groups')
        url = 'message/group/' + this.selectedChat.id
      else
        url = "message/" + this.receipient.username

      this.appProv.showLoading('Sending message...');

      this.appProv.postData(url + '/' + this.message, null).subscribe(res => {
          this.messages.push({
            text: this.message,
            senderUsername: this.currentUser,
            dateSent: new Date()
          });

          this.message = "";
          this.appProv.loading.dismiss();
      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Sending Error',
          subTitle: err.message,
          buttons: ['OK']
        });

        this.appProv.loading.dismiss();
        alert.present();
      });
    }

    addParticipant()
    {
      this.appProv.postData('group',
        { group_id: this.selectedChat.id,
          participant: this.contact.username
      }).subscribe(() => {

      }, (err) => {
        const alert = this.alertCtrl.create({
          title: 'Error adding participant',
          subTitle: err.error,
          buttons: ['OK']
        });

        alert.present();
      });
    }

    goToContactList()
    {
      this.appProv.showLoading('Getting group participants ...');

      this.appProv.getData<any>('group/' + this.selectedChat.id).subscribe(res => {
        this.appProv.participants = res;
        this.navCtrl.push(ContactListPage);
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

    showGroupMenu(event)
    {
      let popover = this.popoverCtrl.create(GroupMenuPage);
      popover.present({
        ev: event
      });
    }
  }
