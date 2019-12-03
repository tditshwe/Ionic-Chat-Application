import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { LoginPage } from '../pages/login/login';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { ChatPage } from '../pages/chat/chat';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { NewGroupPage } from '../pages/new-group/new-group';
import { GroupMenuPage } from '../pages/group-menu/group-menu';
import { GroupInfoPage } from '../pages/group-info/group-info';
import { ProfilePage } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

//import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from '@angular/common/http';
import { AppProvider } from '../providers/app/app';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ChatListPage,
    LoginPage,
    ContactListPage,
    ChatPage,
    SignUpPage,
    NewGroupPage,
    GroupMenuPage,
    GroupInfoPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ChatListPage,
    LoginPage,
    ContactListPage,
    ChatPage,
    SignUpPage,
    NewGroupPage,
    GroupMenuPage,
    GroupInfoPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    ImagePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppProvider
  ]
})
export class AppModule {}
