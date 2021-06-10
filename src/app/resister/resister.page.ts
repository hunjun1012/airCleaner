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
  selector: 'app-resister',
  templateUrl: './resister.page.html',
  styleUrls: ['./resister.page.scss'],
})
export class ResisterPage implements OnInit {

  user: User = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

  //회원가입
async createAccount(){
  try{
  const user = await this.afAuth.createUserWithEmailAndPassword(
    this.user.email,
    this.user.password,
  );
  console.log(user);
  alert("회원가입이 완료되었습니다.");
  this.logout();
  this.router.navigate(['/login']);
}catch(err){
  alert("이메일형식이나 비밀번호6자리 이상 입력해주세요.");
}
  }

//돌아가기
  backlogin() {
    this.router.navigate(['/login'])
  }

  //아이디 로그아웃
async logout(){
  await this.afAuth.signOut();
}

  ngOnInit() {
  }

}
