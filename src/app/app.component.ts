import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ChatListPage } from '../pages/chat-list/chat-list';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
//import { ChatPage } from '../pages/chat/chat';
//import { ContactListPage } from '../pages/contact-list/contact-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage
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

  signOut() {
    this.storage.remove('user');
    this.menu.close();
    this.nav.setRoot(LoginPage);
  }
}
