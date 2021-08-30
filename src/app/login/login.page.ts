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
  phoneNumber?: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

user: User = {
  email: '',
  password: '',
  phoneNumber: ''
};


  item = []
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
  emailAddress: any;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }
  
//아이디 생성
// async createAccount(){
// const user = await this.afAuth.createUserWithEmailAndPassword(
//   this.user.email,
//   this.user.password
// );
// console.log(user);
// }

// 카카오로그인
// logins() {
//   if (typeof KakaoTalk !== 'undefined') {

//     KakaoTalk.login(
//       function (result) {
//         console.log('Successful login!');
//         console.log(result);
//       },
//       function (message) {
//         console.log('Error logging in');
//         console.log(message);
//       }
//     );
//   }
// }

kakaoLogin(){
  window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=d9193551170ff0ca2ecd6cc16e06de8f&redirect_uri=http://localhost:8100/login';
}


//로그인 후 공기청정기 연결화면 이동
  async login() {
    try{
      const user = await this.afAuth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
  );
    console.log(user);
    console.log(this.user.email);
    this.router.navigate(['/wifi']);
  }
  //로그인 실패시
  catch(err){
    alert("아이디/비밀번호를 확인해주세요.");
  }
}

//아이디 로그아웃
async logout(){
  await this.afAuth.signOut();
}
//와이파이 선택 목록으로 돌아가기
home() {
  this.router.navigate(['/wifi'])
  console.log(this.user.email);
}
//회원가입으로
signup() {
  this.router.navigate(['/resister'])
}

//비밀번호찾기 페이지
forgetpage() {
  this.router.navigate(['/forget'])
}

//비밀번호찾기
forget($event) {
  var auth = firebase.auth();
  // var emailAddress = "hunjun1012@naver.com";
  this.emailAddress = $event.target.value;

auth.sendPasswordResetEmail(this.emailAddress).then(function() {
  // console.log("email: " + this.emailAddress);
  // alert("이메일로 링크가 발송되었습니다.")
}).catch(function(error) {
  // alert("실패하였습니다.")
  });
}

  ngOnInit() {
    //firebase sensor테이블 get
    // firebase.database().ref('/devices/device01/sensors').on('value', (val) => {
    //   console.log(val.val());
    //   this.dust = val.val().dust;
    //   this.gas = val.val().gas;
    //   this.voc = val.val().voc;
    // });

    //firebase controls테이블 get
    // firebase.database().ref('/devices/device01/controls').on('value', (val) => {
    //   console.log(val.val());
    //   this.filter = val.val().filter;
    //   this.light = val.val().light;
    //   this.lock = val.val().lock;
    //   this.mode = val.val().mode;
    //   this.power = val.val().power;
    //   this.sound = val.val().sound;
    //   this.timer = val.val().timer;
    //   this.wind = val.val().wind;
    // });
  }
}