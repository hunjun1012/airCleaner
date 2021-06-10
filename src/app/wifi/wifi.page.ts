import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {

  wifiList;
  deviceList;

  constructor(private router: Router, private http: HTTP, private alertCtrl: AlertController) { }
//홈으로 이동하기
home() {
    this.router.navigate(['/home'])
}
//로그인으로 이동하기
login() {
  this.router.navigate(['/login'])
}

getDeviceList(){

}

getDeviceInfo(deviceid){
  
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


//wifi list목록에서 선택하면 비밀번호 입력창 생성
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


//wifi list목록에서 선택한 wifi 연결 시키기
setWifi(wifiId, wifiPwd){
  this.http.get('http://192.168.4.1/setWifi?name='+wifiId+'&pwd='+wifiPwd, {}, {})
  .then(data => {
    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);
    console.log("wifiId: " + wifiId + "    wifiPassword: " + wifiPwd);
    //Wifi 셋팅 완료 메세지 띄우기
    var parsedData = JSON.parse(data.data);
    if(parsedData.result == "0"){
      alert("led 불빛이 유지가 되지않을시 다시 연결을 시도해주세요.");
    } else {
      // alert("연결실패.");
      // this.selectWifi(wifiId);
    }
    this.home();
  })
  .catch(error => {
    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);
    //selectWifi 다시 호출
  });
}

ngOnInit() {
  }

}

