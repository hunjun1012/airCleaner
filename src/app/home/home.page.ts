import { Component, OnInit } from '@angular/core';

import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

import { Router, ActivatedRoute } from '@angular/router';
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
  deviceid: any;
  userSelectDevice: any;
  test : any;
  powerChecked: boolean;
  lockChecked: boolean;
  lightChecked: boolean;
  soundChecked: boolean;
  filterStatus = 80;
  userDeviceAll: any;
  showVar: boolean;
  powerToggle = document.getElementById('powerToggle') as HTMLImageElement;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) { 
      this.deviceid = this.route.snapshot.paramMap.get('deviceId');
  }

  // 와이파이 연결 페이지 이동
  wifi() {
    this.router.navigate(['/wifi'])
  }
  
  //로그아웃 페이지 이동
  // async logout() {
  //   await this.afAuth.signOut();
  //   this.router.navigate(['/login'])
  // }

  //sensors 정보 페이지 이동
  sensors(deviceid?){
    this.router.navigate(['/sensors',deviceid])
  }

  chart(){
    this.router.navigate(['/chart'])
  }

  ngOnInit() {
    firebase.database().ref('/user_device').orderByChild("userid").equalTo(firebase.auth().currentUser.email).on('value', (val) => {
    //로그인 유저 아이디
    console.log("user id : " + firebase.auth().currentUser.email);
    this.userDeviceAll = val.val();
    console.log("userdeviceall")
    console.log(this.userDeviceAll);
    });
    
    //firebase device아이디 일치하는 sensor테이블 get
    firebase.database().ref('/devices').orderByChild("deviceid").equalTo(this.deviceid).on('value', (val) => {
      this.userSelectDevice = val.val();
    });

    //device table => sensors 동기화
    // firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/sensors').on('value', (val) => {
    //   console.log(val.val());
    //   this.dust = val.val().dust;
    //   this.gas = val.val().gas;
    //   this.voc = val.val().voc;
    //   this.temperature = val.val().temperature;
    //   this.humidity = val.val().humidity;
    // });
    
    //device table => controls 동기화
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').on('value', (val) => {
      // console.log(val.val());
      this.filter = val.val().filter;
      this.light = val.val().light;
      this.lock = val.val().lock;
      this.mode = val.val().mode;
      this.power = val.val().power;
      this.sound = val.val().sound;
      this.timer = val.val().timer;
      this.wind = val.val().wind;

      //power 0일때 화면가림
      if(this.power == 0){
        // document.getElementById('info2').hidden = true;
        document.getElementById('toggleDiv').hidden = true;
      }else{
        // document.getElementById('info2').hidden = false;
        document.getElementById('toggleDiv').hidden = false;
      }

      //checked 상태 확인
      if(this.power == "1"){
        this.powerChecked = true;
      }else{
        this.powerChecked = false;
      }
      if(this.lock == "1"){
        this.lockChecked = true;
      }else{
        this.lockChecked = false;
      }
      if(this.light == "1"){
        this.lightChecked = true;
      }else{
        this.lightChecked = false;
      }
      if(this.sound == "1"){
        this.soundChecked = true;
      }else{
        this.soundChecked = false;
      }
    });
  }
//******************************************************************************************************************************************************************************************************* */
// element: HTMLImageElement;
  powerControl(event){
    if(event == true){
      event = "1";
    }else{
      event = "0";
    }
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "power" : event
    });
    //필터 구매 알람 생성 후 페이지 이동
    if(this.filter == 1 && this.power == 1){
      alert("현재 공기청정기는 필터교체가 필요합니다.")
      window.open('http://iaceone.com/shop/item_detail.php?it_id=1548660423');
    }else{
      return;
    }
  }

  modeControl(event){
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "mode" : event
    });
  }

  windControl(event){
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "wind" : event
    });
  }

  lockControl(event){
    if(event == true){
      event = "1"
    }else{
      event = "0"
    }
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "lock" : event
    });
  }

  lightControl(event){
    if(event == true){
      event = "1"
    }else{
      event = "0"
    }
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "light" : event
    });
  }

  soundControl(event){
    if(event == true){
      event = "1"
    }else{
      event = "0"
    }
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "sound" : event
    });
  }

  timerControl(event){
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/controls').update({
      "timer" : event
    });
  }
  
  
}
