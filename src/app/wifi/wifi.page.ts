import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { asapScheduler, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";
//로그인기능
import { AngularFireAuth } from '@angular/fire/auth';
import { noUndefined } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {
  user_device;
  wifiList;
  deviceList;
  deviceid: any;
  userDeviceAll: any[];
  deviceName;
  alreadyDevice: any;
  isConnected: any;
  isConn: any;
  obj: any;
  userSelectDevice: any;
  constructor(private router: Router, private http: HTTP, public alertController: AlertController, public afAuth: AngularFireAuth) { 
    this.deviceName = {};
  }
//홈으로 이동하기
home(deviceid?) {
  this.router.navigate(['/home',deviceid])
}
//로그인으로 이동하기
login() {
  this.router.navigate(['/login'])
}

getListResponse(data) {
    console.log("Wifi List:");
    console.log(data);
    var parsedData = JSON.parse(data);
    console.log(parsedData.list);
    this.wifiList = parsedData.list; //wifiList 생성
  }

//현재 wifi list 호출
getWifiList(){
  this.http.get('http://192.168.4.1/list', {}, {})
      .then(data => {
        console.log("datastatus: " + data.status); 
        console.log("data.data: " + data.data); // data received by server
        // console.log(data.data.result + "result");
        // console.log(data.headers);
        var parsedData = JSON.parse(data.data); // get wifi list
        console.log("parsedData.list: " + parsedData.list);
        console.log("parsedData: " + parsedData);
        console.log("parsedData.result: " + parsedData.result);
        this.wifiList = parsedData.list;
      })
      .catch(error => {
        console.log(error);
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
}


//wifi list목록에서 선택하면 비밀번호 입력창 생성 후 확인 및 취소
selectWifi(wifiId){
  console.log(wifiId);
  wifiPwd;
  //패스워드 입력창
  var wifiPwd = prompt("비밀번호");
  //취소 눌렀을때 
  if(wifiPwd == null){
    return;
  }
  //확인 눌렀을 때
  this.setWifi(wifiId, wifiPwd);
}


//원하는 wifi 선택 후 연결 후 db에 push
setWifi(wifiId, wifiPwd){
  this.http.get('http://192.168.4.1/setWifi?name='+wifiId+'&pwd='+wifiPwd, {}, {})
  .then(data => {
    console.log(data.data); // data received by server
    console.log("wifiId: " + wifiId + "    wifiPassword: " + wifiPwd);
    var parsedData = JSON.parse(data.data);
    console.log(parsedData);
    

    // result = 0일때 실행, register == 1 일때 실행
    if(parsedData.result == "0"){
      
      // 3초 뒤에 기기가 없으면 추가
      setTimeout(function(){
        //device table => isConnected 동기화
        // firebase.database().ref('/devices').orderByChild("deviceid").equalTo(parsedData.uuid).on('value', (val) => {
        //       var key = Object.keys(val.val())[0];
        //       console.log(val.val()[key].sensors.isConnected);
        //       //현재 연결 상태 0일때 연결 안됌
        //       this.isConn = val.val()[key].sensors.isConnected;
        //   });
          
        console.log("parsedData.uuid : " + parsedData.uuid);
        firebase.database().ref('/devices').orderByChild("deviceid").equalTo(parsedData.uuid).on('value', (val)=>{
          //devices 테이블에 디바이스가 등록되있으면 true 없으면 false
          var deviceRegisted = false;
          if(Object.keys(val.val()).length > 0){
            deviceRegisted = true;
          }
          // 디바이스가 devices 테이블에 등록이 되어있어야하고 isConnected가 1이상이여야 등록하여야 함
          if(deviceRegisted == true){
            var user_device = firebase.database().ref("/user_device");      
            console.log(user_device);
            //user_device table : userid, order, deviceid 컬럼 (json) 
            var newUserDevice={
              userid: firebase.auth().currentUser.email,
              order: "0",
              deviceid: parsedData.uuid
            };
            console.log(newUserDevice);
    
            user_device.orderByChild('deviceid').equalTo(newUserDevice.deviceid).once('value').then((val)=>{
              
              console.log("user_Device test");
              for(var user_device_object in val.val()){
                console.log(val.val()[user_device_object].userid);
                if(val.val()[user_device_object].userid == firebase.auth().currentUser.email){
                  return;
                }
              }
              user_device.push(newUserDevice);
            }).catch((error)=>{
              user_device.push(newUserDevice);
            });
            
  
            firebase.database().ref("/devices/"+parsedData.uuid).off();
          }    
        });
      }, 1000 * 2);
      // firebase.database().ref('/devices/'+Object.keys(this.deviceid)[0]).orderByChild("deviceid").equalTo(parsedData.uuid).on('value', (val) => {
      //       if(val.val().deviceid != null){
      //     var user_device = firebase.database().ref("/user_device");      

      //     var newUserDevice={
      //       userid: firebase.auth().currentUser.email,
      //       order: "0",
      //       deviceid: val.val().deviceid
      //     };
  
      //     user_device.push(newUserDevice);

      //     firebase.database().ref("/devices/"+parsedData.uuid).off();
      //     }
      //   });
      /* var devices = firebase.database().ref("/devices");
      //devices table : sensors, controls, deviceid 컬럼 (json)
      var newDevices={
        deviceid: parsedData.uuid,
        sensors: {
          dust : "0", gas : "0", voc : "0", temperature : "0", humidity : "0"
        },
        controls: {
          filter : "0", light : "1" , lock : "0" , mode : "1" , power : "0" , sound : "1" , timer : "0" , wind : "1"
        },
      }; 
      devices.push(newDevices);
      */
    //devices 테이블 유효성 검사 후 table 추가 
    // firebase.database().ref("/devices").orderByChild("deviceid").equalTo(this.deviceid).once('value', snapshot => {
    //   var device = snapshot.val();
    //   console.log(device);
    //   if(device == null){
    //     devices.push(newDevices); 
    //   }else{
    //     return;
    //   }
    // });
    //user_table 유효성 검사 후 table 추가
    // firebase.database().ref("/user_device").orderByChild("userid").equalTo(firebase.auth().currentUser.email).once('value', snapshot => {
    //   var devices = snapshot.val();
    //   for(var key in devices){
    //     var device = devices[key];         
    //     if(device.deviceid == this.deviceid){
    //       return;
    //     }else{
    //       user_device.push(newUserDevice); 
    //     }
    //   }
    // });
    // var user_device = firebase.database().ref("/user_device");      
    // var newUserDevice={
    //         userid: firebase.auth().currentUser.email,
    //         order: "0",
    //         deviceid: parsedData.uuid
    //       };
    // user_device.push(newUserDevice);

    } // retry message
      alert("led 불빛이 유지가 되지않을시 다시 연결을 시도해주세요.");
      this.login();
  })
  // error message as string
  .catch(error => {
    console.log(error);
    console.log(error.status);
    console.log(error.error);
    console.log(error.headers);
  });
}

// 유저가 선택한 device 기기 삭제 <user_device 삭제>
deleteDevice(deviceId) {
  var retVal = confirm("기기를 삭제하시겠습니까?");
  if( retVal == true ){
    const ref = firebase.database().ref('/user_device');
    ref.orderByChild('deviceid').equalTo(deviceId).once('value', snapshot => {
         const updates = {};
         snapshot.forEach(child => updates[child.key] = null);
         ref.update(updates);
    });
  }else{
    return;
  }
} 

//클릭시 팝업 창에서 이름 변경
async presentAlert(deviceId) {
  const alert = await this.alertController.create({
    header: '공기청정기 이름',
    message: '원하는 이름을 입력하세요.',
    inputs: [
      {
        name: 'Place',  
        placeholder: '이름',
      },
    ],
    buttons: [
      {
        text: '취소',
        handler: (data: any) => {
          console.log('취소', data);
        }
      },
      {
        text: '확인',
        handler: (data: any) => {
          // 변경버튼 눌렀을때 firebase에 deviceName update 
          firebase.database().ref('/user_device').orderByChild("deviceid").equalTo(deviceId).once('value', function (snapshot) {
            snapshot.forEach(function(child) {
              child.ref.update({deviceName: data.Place});
            });
          });
          console.log(deviceId);
          console.log(data.Place);
        }
      }
    ]
  });
  await alert.present();
}

//test
// test(){
  // devices => isConnected 벨류값 추출
    // var parsedData = {"result": "0","uuid":"14E4EB2A03A8"};
    //   firebase.database().ref('/devices').orderByChild("deviceid").equalTo(parsedData.uuid).on('value', (val) => {
    //   var key = Object.keys(val.val())[0];
    //       console.log(val.val()[key].sensors.isConnected);
    //       var isconn = val.val()[key].sensors.isConnected;
    //       console.log(isconn);
    //   });
// }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 실시간 호출 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
ngOnInit() {
  //전체 디바이스 목록
  firebase.database().ref('/devices').on('value', (val) => {
    this.deviceid = val.val();
    // console.log(val.val());  
  });

 
//유저별 디바이스 목록
  firebase.database().ref('/user_device').orderByChild("userid").equalTo(firebase.auth().currentUser.email).on('value', (val) => {
    // console.log(this.userDeviceAll)
    //로그인 유저 아이디
    // console.log("user id : " + firebase.auth().currentUser.email);
    
    this.userDeviceAll = val.val();  
    var keys =Object.keys(this.userDeviceAll);
    for(var i = 0 ; i < keys.length; i++){  
      var deviceid = this.userDeviceAll[keys[i]].deviceid;
      firebase.database().ref('/devices').orderByChild("deviceid").equalTo(deviceid).once('value', (val) => {
        this.userDeviceAll[keys[i]]['isConnected'] = val.val()[Object.keys(val.val())[0]].sensors.isConnected>0?true:false;
        console.log("연결상태 0일때 연결X / 연결상태 1이상 연결O")
        console.log(val.val()[Object.keys(val.val())[0]].sensors.isConnected);
      });
    }
    // console.log("userdeviceall")
    // console.log(val.val().value.deviceid);
    // console.log(val.val().deviceid);
    });
  }

}

