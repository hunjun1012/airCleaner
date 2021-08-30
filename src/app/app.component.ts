import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { FIREBASE_CONFIG } from './environment'

import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';



const firebaseConfig = {
  apiKey: "AIzaSyCYCaImUWo1EgpjE-83Xwpl0xX2KiNvpRI",
    authDomain: "aircleaner-5092f.firebaseapp.com",
    databaseURL: "https://aircleaner-5092f-default-rtdb.firebaseio.com",
    projectId: "aircleaner-5092f",
    storageBucket: "aircleaner-5092f.appspot.com",
    messagingSenderId: "132830224871",
    appId: "1:132830224871:web:e87dd4c1a0f5d577935d42",
    measurementId: "G-TQJNJZ65ZX"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  back_clicked = 0;

  constructor(
    private toastCtrl: ToastController,
      private platform: Platform,
      private splashScreen: SplashScreen,
      public alertController: AlertController,
      private statusBar: StatusBar) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        firebase.initializeApp(FIREBASE_CONFIG);
    });
  }

  //show 알람창
  showPrompt() {
    this.alertController.create({
      header: 'Prompt Alert',
      subHeader: 'Enter information requested',
      message: 'Enter your favorate place',
      inputs: [
        {
          name: 'Place',
          placeholder: 'Eg.NY',
          
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (data: any) => {
            console.log('Saved Information', data);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

ngOnInit() {
      this.appExitConfig();
  }

  private appExitConfig() {
      this.platform.backButton.subscribe(async () => {
          if (this.back_clicked === 0) {
              this.back_clicked++;

              const toast = await this.toastCtrl.create({
                  message: '뒤로가기 버튼을 한번 더 누르시면 앱이 종료됩니다.',
                  duration: 500
              });
              toast.present();

              setTimeout(() => {
                  this.back_clicked = 0;
              }, 500);
          } else {
              navigator['app'].exitApp();
          }
      });
  }

}
