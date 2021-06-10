import { Component, OnInit } from '@angular/core';

import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

import { Router } from '@angular/router';

//로그인기능
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {


  emailAddress: any;



  constructor(
    public router: Router,
    public afAuth: AngularFireAuth
  ) { }
  
//와이파이 연결 페이지 이동
login() {
  this.router.navigate(['/login'])
}  

//비밀번호찾기
forget($event) {
  var auth = firebase.auth();
  //입력한 이메일의 value 값 
  this.emailAddress = $event.target.value;
//입력한 이메일의 value값으로 비밀번호 변경 링크 전송
auth.sendPasswordResetEmail(this.emailAddress).then(function() {
    alert("이메일로 비밀번호 변경 링크가 발송되었습니다.")
  }).catch(function(error) {
    // error메세지
    // alert("등록되지 않은 이메일입니다.")
  });
}

  ngOnInit() {
  }

}
