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
  

  constructor(
    public switchpage:SwitchPageService,
    public sess:ManageSessionService,
    private account:AccountService,
    public sounds:SoundsService,
    ) { }

  ngOnInit(): void {
    let loginsound = this.sounds.list().login;
    
    this.sounds.playLoop(loginsound);
  }

  async Login()
  {

    //do validation, then changepage if user
    console.log(this.username);
    console.log(this.password);

    let userId = await this.account.login(this.username, this.password);
    this.playerStats = await this.account.getStats(this.user.id) as PlayerStats

    console.log('user', this.user);
    console.log('stats', this.playerStats);
    
    // if user is null, then invalid username + password combination
    if (userId == null || userId == undefined) {
      // login failed
      console.log('login failed');
    } else {
      // login successful
      // store userId to session storage
      sessionStorage.setItem('id', userId.toString());

      if(this.playerStats == null || this.user == undefined){
        alert("is null")
      }
      else{
        sessionStorage.setItem("totalBattles", this.playerStats.totalBattles.toString())
        sessionStorage.setItem("win", this.playerStats.wins.toString())
        sessionStorage.setItem("loss", this.playerStats.loss.toString())
        sessionStorage.setItem("expLevel", this.playerStats.experience.toString())
        sessionStorage.setItem("side", this.playerStats.affiliation.toString())
      }
    

      console.log('login success')
      this.switchpage.changePage('traverse');
    }

  }

  async Register() {
    console.log(`u ${this.username} : p ${this.password} : a ${this.selAffil}`)
    this.account.register(this.username, this.password, this.selAffil)
  }

  switch() {
    if (this.isRegistering)
      this.isRegistering = false;
    else {
      this.isRegistering = true;
    }
  }
}
