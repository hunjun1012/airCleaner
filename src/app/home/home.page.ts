import { Component, OnInit } from '@angular/core';

import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

import { Router } from '@angular/router';
//로그인기능
import { AngularFireAuth } from '@angular/fire/auth';

interface User {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: User = {
    email: '',
    password: ''
  };
  

  item = []
  // ref = firebase.database().ref('sensors');
  dust: any;
  gas: any;
  voc: any;
  filter: any;
  light: any;
  lock: any;
  mode: any;
  power: any;
  sound: any;
  timer: any;
  wind: any;
  temperature: any;
  humidity: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { 
      // this.ref.on('sensors', res => {
      //     console.log(snapshotToArray(res))
      // })
  }

  //와이파이 연결 페이지 이동
wifi() {
  this.router.navigate(['/wifi'])
}
 //로그아웃 페이지 이동
 async logout() {
  await this.afAuth.signOut();
  this.router.navigate(['/login'])
}

  ngOnInit() {
    //firebase sensor테이블 get
    firebase.database().ref('/devices/device01/sensors').on('value', (val) => {
      console.log(val.val());
      this.dust = val.val().dust;
      this.gas = val.val().gas;
      this.voc = val.val().voc;
      this.temperature = val.val().temperature;
      this.humidity = val.val().humidity;
    });

    //firebase controls테이블 get
    firebase.database().ref('/devices/device01/controls').on('value', (val) => {
      console.log(val.val());
      this.filter = val.val().filter;
      this.light = val.val().light;
      this.lock = val.val().lock;
      this.mode = val.val().mode;
      this.power = val.val().power;
      this.sound = val.val().sound;
      this.timer = val.val().timer;
      this.wind = val.val().wind;
    });
  }

  lightOption(val){
    console.log("light: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "light" : val
    });
  }

  powerOption(val){
    console.log("power: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "power" : val
    });
  }

  lockOption(val){
    console.log("lock: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "lock" : val
    });
  }

  modeOption(val){
    console.log("lock: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "mode" : val
    });
  }

  soundOption(val){
    console.log("sound: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "sound" : val
    });
  }

  timerOption(val){
    console.log("timer: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "timer" : val
    });
  }

  windOption(val){
    console.log("wind: " + val);
    firebase.database().ref('/devices/device01/controls').update({
      "wind" : val
    });
  }

}