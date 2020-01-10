import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AppProvider} from '../../providers/app/app';
import { User } from '../../Models/user';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User;
  edited: boolean = false;
  icon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appProv: AppProvider,
    public imagePicker: ImagePicker) {
    this.user = this.appProv.user;
    //this.icon =
  }

  profileEdited()
  {
    this.edited = true;
  }

  saveChanges()
  {
    this.appProv.showLoading('Updating profile ...');

    this.appProv.putData('user/',
    {
      displayName: this.user.name,
      status: this.user.status
    }).subscribe(() => {
      this.appProv.loading.dismiss();
      this.edited = false;
    }, err => {
      alert(err.console.error());
    });
  }

  openImagePicker(){
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          }).then(
            (results) => {
              for (var i = 0; i < results.length; i++) {
                alert('Image selected');
              }
            }, (err) => alert(err)
          );
        }
      }, (err) => {
        alert(err);
      });
  }
}
