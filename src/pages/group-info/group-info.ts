import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {AppProvider} from '../../providers/app/app';

@Component({
  selector: 'page-group-info',
  templateUrl: 'group-info.html',
})
export class GroupInfoPage {
  participants: any;
  group: any;
  user: string;
  groupName: string;
  nameEdited: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appProv: AppProvider) {
    this.group = this.appProv.currentGroup;
    this.groupName = this.group.name;
    this.user = this.appProv.user.username;

    this.loadParticipants();
  }

  ionViewWillLeave() {
    console.log("Group info out :(");
  }

  loadParticipants()
  {
    this.appProv.showLoading('Waiting for participants...');

    this.appProv.getData<any>('group/participants/' + this.group.id).subscribe(res => {
      this.participants = res;
      this.appProv.loading.dismiss();
    }, err => {
      alert(err.console.error());
    });
  }

  editName()
  {
    this.nameEdited = true;
  }

  cancelEdit()
  {
    this.nameEdited = false;
  }

  updateName()
  {
    this.appProv.showLoading('Updating group name ...');

    this.appProv.putData('group/', {
      id: this.group.id,
      name: this.groupName }).subscribe(() => {
      this.appProv.loading.dismiss();
      this.nameEdited = false;
    }, err => {
      alert(err.console.error());
    });
  }

  removeParticipant(participant:string) {
    this.appProv.showLoading('Removing participant...');

    this.appProv.postData('group/' + this.group.id + '/' + participant, null).subscribe(() => {
        this.appProv.loading.dismiss();
        this.loadParticipants();
    }, err => {
      alert(err.console.error());
    });
  }
}
