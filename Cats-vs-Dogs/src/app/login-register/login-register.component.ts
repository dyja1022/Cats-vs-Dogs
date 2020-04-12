import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { AccountService } from '../services/account.service';
import { SoundsService } from '../services/sounds.service';
import {UserStats} from '../interfaces/user-stats';

interface Animal {

}

interface User {
  id : number;
  username : string;
}

interface PlayerStats{
    userid: number,
    totalBattles: number,
    wins:number,
    loss:number,
    experience:number,
    affiliation: string
  }


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {

  username: string;
  password: string;
  selAffil = 'Cats';
  user: User;
  playerStats: UserStats;
  isRegistering = false;
  
  dogElem:HTMLElement;
  catElem:HTMLElement;

  constructor(
    public switchpage:SwitchPageService,
    public sess:ManageSessionService,
    private account:AccountService,
    public sounds:SoundsService,
    ) { }

  ngOnInit(): void {
    let loginsound = this.sounds.list().login;
    
    this.sounds.playLoop(loginsound);

    // dog & cat elem for enraged style transition
    this.dogElem = document.getElementById('dog-faceoff-enraged');
    this.catElem = document.getElementById('cat-faceoff-enraged');
    this.enrageOff();  // both cat & dog initial opacity set to 0 
  }

  async Login()
  {

    //do validation, then changepage if user
    console.log(this.username);
    console.log(this.password);

    const userId = await this.account.login(this.username, this.password) as number;
    const playerStats = await this.account.getStats(userId) as PlayerStats

    console.log('userId', userId);
    console.log('stats', playerStats);
    
    // if user is null, then invalid username + password combination
    if (userId == null || userId == undefined) {
      // login failed
      console.log('login failed');
    } else {
      // login successful
      // store userId to session storage
      sessionStorage.setItem('id', userId.toString());

      if(playerStats == null || userId == undefined){
        alert("is null")
      }
      else{
        sessionStorage.setItem("totalBattles", playerStats.totalBattles.toString())
        sessionStorage.setItem("win", playerStats.wins.toString())
        sessionStorage.setItem("loss", playerStats.loss.toString())
        sessionStorage.setItem("expLevel", playerStats.experience.toString())
        sessionStorage.setItem("side", playerStats.affiliation.toString())
      }
    

      console.log('login success')
      this.switchpage.changePage('traverse');
    }

  }

  enrageOff() {
    this.catElem.style.opacity = '0';
    this.catElem.style.transition = '1s';

    this.dogElem.style.opacity = '0';
    this.dogElem.style.transition = '1s';
  }

  enrageOn() {
    if (this.selAffil == 'Dogs') {
      this.bork();
    }
    else if (this.selAffil == 'Cats') {
      this.meow();
    }
  }

  bork() {
      this.sounds.playOnce(this.sounds.list().bork);
      console.log('enr1', this.selAffil)
      this.dogElem.style.opacity = '100';
      this.dogElem.style.transition = '1s';
      this.catElem.style.opacity = '0';
      this.catElem.style.transition = '1s';
  }
  meow() {
      this.sounds.playOnce(this.sounds.list().meow)
      console.log('enr2', this.selAffil)
      this.catElem.style.opacity = '100';
      this.catElem.style.transition = '1s';
      this.dogElem.style.opacity = '0';
      this.dogElem.style.transition = '1s';
  }

  async Register() {

    console.log(`u ${this.username} : p ${this.password} : a ${this.selAffil}`)
    const resp = await this.account.register(this.username, this.password, this.selAffil) as number;
    console.log('reg',resp);

    if (isNaN(resp)) {
      // register failed
    }
    else {
      // register success
      this.switch()
    }
  }

  switch() {
    if (this.isRegistering) {
      this.isRegistering = false;
      this.enrageOff();
    }
    else {
      this.isRegistering = true;
      this.enrageOn();
    }
  }
}
