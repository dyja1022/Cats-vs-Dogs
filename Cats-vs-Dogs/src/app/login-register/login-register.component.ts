import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { AccountService } from '../services/account.service';
import {Howl, Howler} from 'howler';

interface Animal {

}

interface User {
  id : number;
  username : string;
  firstLogin : boolean;
  animal : Animal
}


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {

  username: string;
  password: string;
  user: User;



  constructor(
    public switchpage:SwitchPageService,
    public sess:ManageSessionService,
    private account:AccountService) { }

  ngOnInit(): void {
    //this.playMusic()
  }

  playMusic() {
    let audio = new Audio();
    audio.src = 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3';
    audio.load();
    audio.play();
  }

  async Login()
  {

    //do validation, then changepage if user
    console.log(this.username);
    console.log(this.password);

    this.user = await this.account.login(this.username, this.password) as User;
    
    console.log('user', this.user);
    
    // if user is null, then invalid username + password combination
    if (this.user == null || this.user == undefined) {
      console.log('login failed');
    } else {
      console.log('login success')
      this.switchpage.changePage('traverse');
    }

    //this.switchpage.changePage('traverse');
  }

  

  ResetStats()
  {
    // this.sess.setHealth("");
    // this.sess.setHunger("");
  }

}
