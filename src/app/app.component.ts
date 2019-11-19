import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ChatListPage } from '../pages/chat-list/chat-list';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProfilePage } from '../pages/profile/profile';
import { ChatListPage } from '../pages/chat-list/chat-list';
//import { ChatPage } from '../pages/chat/chat';
//import { ContactListPage } from '../pages/contact-list/contact-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import {AppProvider} from '../providers/app/app';
import { User } from '../Models/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage:any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    public appProv: AppProvider
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      //{ title: 'Sign In', component: LoginPage},
      { title: 'Hello Ionic', component: HelloIonicPage }
      //{ title: 'My First List', component: ChatListPage },
      //{ title: 'Single Chat', component: ChatPage },
      //{ title: 'Contact List', component: ContactListPage },
     // { title: 'Sign Up', component: SignUpPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storage.get('user').then((user) => {
        if (user)
        {
          this.appProv.showLoading('Initialising ...')
          this.appProv.setTokenHeader(user.api_token);

          this.appProv.getData<User>('user/').subscribe(res => {
            this.appProv.user = res;
            this.rootPage = ChatListPage;
            this.appProv.loading.dismiss();
          },
          () => {
            this.appProv.loading.dismiss();
            this.rootPage = LoginPage
          });
        }
        else
        this.rootPage = LoginPage
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  profile() {
    this.nav.push(ProfilePage);
  }

  signOut() {
    this.storage.remove('user');
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }
}
