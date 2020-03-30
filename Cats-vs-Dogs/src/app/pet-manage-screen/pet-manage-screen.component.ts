import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';

@Component({
  selector: 'app-pet-manage-screen',
  templateUrl: './pet-manage-screen.component.html',
  styleUrls: ['./pet-manage-screen.component.css']
})
export class PetManageScreenComponent implements OnInit {

  constructor(
    private switchpage:SwitchPageService,
    public status:ManageStatusService
  ) { }

  ngOnInit(): void {
    //this.status.setFullBar(".bar-wrapper");
    //alert('init working');
   // sessionStorage.getItem("");
  }

  ngAfterViewInit()
  {
    this.status.setFullBar(".bar-wrapper");
    //alert('view init working');
  }
  

  GivePotion()
  {
    this.status.raiseBar('health',5)
  }

  GiveFood()
  {
    this.status.raiseBar('hunger',5)
  }


  Logout()
  {
    this.switchpage.changePage('login')
  }

  Close()
  {
    this.switchpage.changePage('traverse')
  }

  ngOnDestroy(){
    //alert("destroy working");
    //this.status.setFullBar(undefined);

  }
}
