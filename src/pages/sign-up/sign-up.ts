import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';

import { LoginPage } from '../login/login';
import {AppProvider} from '../../providers/app/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  username: String;
  password: String;
  passConfirm: String;
  name: String;

  sign_up_form: FormGroup;
  passwords_group: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl:AlertController,
              public http: HttpClient,
              public appProv: AppProvider,
              public formBuilder: FormBuilder) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  ionViewWillLoad() {
    this.sign_up_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required),
    });

    this.passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });
  }

  signUp(event, item) {
    let data = {
      username: this.username,
      password: this.password,
      name: this.name
    };

    if (this.passConfirm != this.password)
    {
        const alert = this.alertCtrl.create({
            title: 'Password Mismatch',
            subTitle: "Passwords don't match",
            buttons: ['OK']
        });

        alert.present();
        return;
    }

    this.appProv.showLoading('Signing up...');

    this.appProv.postData('account', data)
      .subscribe(res => {
        this.navCtrl.push(LoginPage);
        this.appProv.loading.dismiss();
      }, (err) => {
        console.log(err.error);

        this.appProv.showToast(err.error.message);
        this.appProv.loading.dismiss();
    });
  }

  logIn() {
    this.navCtrl.push(LoginPage);
  }
}
