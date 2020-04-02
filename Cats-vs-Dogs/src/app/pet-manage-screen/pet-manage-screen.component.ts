import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';
import { ManageSessionService } from '../services/manage-session.service';

@Component({
  selector: 'app-pet-manage-screen',
  templateUrl: './pet-manage-screen.component.html',
  styleUrls: ['./pet-manage-screen.component.css']
})
export class PetManageScreenComponent implements OnInit {

  expBar;
  healthBar;
  hungerBar;

  constructor(
    private switchpage:SwitchPageService,
    public status:ManageStatusService,
    public sess:ManageSessionService
  ) { }

  ngOnInit(): void {
    //this.status.setFullBar(".bar-wrapper");
    //alert('init working');
   // sessionStorage.getItem("");
  }

  ngAfterViewInit()
  {
    this.status.setFullBar(".bar-wrapper");

    this.expBar = this.sess.getExperience();
    this.healthBar = this.sess.getHealth();
    this.hungerBar = this.sess.getHunger();

    this.status.setBar("experience",this.expBar);
    this.status.setBar("health",this.healthBar);
    this.status.setBar("hunger",this.hungerBar);

  }
  
  lowerBar(id){
    this.status.lowerBar(id,5);
    this.getAllBars();
  }

  raiseBar(id){
    this.status.raiseBar(id,5);
    this.getAllBars();
  }

  GivePotion()
  {
    this.status.raiseBar('health',5);
    this.getAllBars();
  }

  GiveFood()
  {
    this.status.raiseBar('hunger',5);
    this.getAllBars();
  }

  getAllBars()
  {
    this.expBar =  this.status.getBarPercent("experience");
    this.healthBar = this.status.getBarPercent("health");
    this.hungerBar = this.status.getBarPercent("hunger");
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
    //alert("experience: "+this.expBar+", health: "+this.healthBar+", hunger: "+this.hungerBar);

    this.sess.setExperience(this.expBar);
    this.sess.setHealth(this.healthBar);
    this.sess.setHunger(this.hungerBar);

  }
}
