import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(public switchpage:SwitchPageService) { }

  ngOnInit(): void {
  }

}
