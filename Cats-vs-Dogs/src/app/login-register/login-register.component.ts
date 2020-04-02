import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { AccountService } from '../services/account.service';

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
  }

  Login()
  {
    //do validation, then changepage if user
    console.log(this.username);
    console.log(this.password);
    this.account.login(this.username, this.password).subscribe(
      (data) => 
      this.user = data as User
    )

    if (this.user === null) {
      console.log('login success')
    } else {
      console.log('login failed')
    }

    //this.switchpage.changePage('traverse');
  }

  ResetStats()
  {
    // this.sess.setHealth("");
    // this.sess.setHunger("");
  }

}
