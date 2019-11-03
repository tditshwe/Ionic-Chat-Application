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
  groupName: string;
  nameEdited: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appProv: AppProvider) {
    this.appProv.showLoading('Waiting for participants...');
    this.group = this.appProv.currentGroup;

    this.appProv.getData<any>('group/' + this.group.id).subscribe(res => {
      this.participants = res;
      this.appProv.loading.dismiss();
    }, err => {
      alert(err.console.error());
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupInfoPage');
  }

  editName()
  {
    this.nameEdited = true;
  }

}
