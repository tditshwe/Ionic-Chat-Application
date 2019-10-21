import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { GroupInfoPage } from '../group-info/group-info';

@Component({
  selector: 'page-group-menu',
  templateUrl: 'group-menu.html',
})
export class GroupMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupMenuPage');
  }

  groupInfo()
  {
    console.log('Group info here')
    this.navCtrl.push(GroupInfoPage);
    this.viewCtrl.dismiss();
  }
}
