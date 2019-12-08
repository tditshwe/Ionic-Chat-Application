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
    this.appProv.showLoading('Waiting for participants...');
    this.group = this.appProv.currentGroup;
    this.groupName = this.group.name;
    this.user = this.appProv.user.username;

    this.appProv.getData<any>('group/' + this.group.id).subscribe(res => {
      this.participants = res;
      this.appProv.loading.dismiss();
    }, err => {
      alert(err.console.error());
    });
  }

  ionViewWillLeave() {
    console.log("Group info out :(");
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

    this.appProv.putData('group/' + this.group.id, { groupName: this.groupName }).subscribe(() => {
      this.appProv.loading.dismiss();
      this.nameEdited = false;
    }, err => {
      alert(err.console.error());
    });
  }
}
