import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';

@Component({
  selector: 'app-pet-manage-screen',
  templateUrl: './pet-manage-screen.component.html',
  styleUrls: ['./pet-manage-screen.component.css']
})
export class PetManageScreenComponent implements OnInit {

  constructor(public switchpage:SwitchPageService) { }

  ngOnInit(): void {
  }
  
  Logout()
  {
    this.switchpage.changePage('login')
  }

  Close()
  {
    this.switchpage.changePage('traverse')
  }

}
