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
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {

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
// filter
  filterStatus: any;
// color set
  dynamicColorDust: string;
  dynamicColorGas: string;
  dynamicColorVoc: string;
  dynamicColorFilter: string;
  
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
  this.deviceid = this.route.snapshot.paramMap.get('deviceId'); 
  }

  filterShop() {
    window.open("http://iaceone.com/shop/item_detail.php?it_id=1548660423")
  }

  filterChart(deviceid?){
    this.router.navigate(['/filter-chart',deviceid])
  }

  temperatureChart(deviceid?) {
    this.router.navigate(['/temperature-chart',deviceid])
  }

  humidityChart(deviceid?){
    this.router.navigate(['/humidity-chart',deviceid])
  }

  gasChart(deviceid?) {
    this.router.navigate(['/chart',deviceid])
  }

  vocChart(deviceid?) {
    this.router.navigate(['/voc-chart',deviceid])
  }

  dustChart(deviceid?){
    this.router.navigate(['/dust-chart',deviceid])
  }

ngOnInit() {
  console.log(this.deviceid)
    //firebase device아이디 일치하는 sensor테이블 get
    firebase.database().ref('/devices').orderByChild("deviceid").equalTo(this.deviceid).on('value', (val) => {
      this.userSelectDevice = val.val();
    });

    //device table => sensors 동기화
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/sensors').on('value', (val) => {
      // console.log(val.val());
      this.dust = val.val().dust;
      this.gas = val.val().gas;
      this.voc = val.val().voc;
      this.temperature = val.val().temperature;
      this.humidity = val.val().humidity;
        if(this.dust <= 30){
          this.dynamicColorDust = 'success';
        }else if(this.dust >= 31 && this.dust <= 60){
          this.dynamicColorDust = 'warning';
        }else{
          this.dynamicColorDust = 'danger';
        }
   
        if(this.gas <= 30){
          this.dynamicColorGas = 'success';
        }else if(this.gas >= 31 && this.gas <= 60){
          this.dynamicColorGas = 'warning';
        }else{
          this.dynamicColorGas = 'danger';
        }
  
        if(this.voc <= 30){
          this.dynamicColorVoc = 'success';
        }else if(this.voc >= 31 && this.voc <= 60){
          this.dynamicColorVoc = 'warning';
        }else{
          this.dynamicColorVoc = 'danger';
        }
    });

    //device table => filterStatus 동기화
    firebase.database().ref('/devices/'+Object.keys(this.userSelectDevice)[0]+'/filterStatus').on('value', (val) => {
      // console.log(val.val());
      this.filterStatus = val.val();

      // 10이하일 때 필터교체
      if(this.filterStatus < 10){
        this.dynamicColorFilter = 'danger';
      }
    });

  }
}