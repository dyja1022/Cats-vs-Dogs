import { Component, OnInit } from '@angular/core';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';
import { ManageSessionService } from '../services/manage-session.service';
import { SoundsService } from '../services/sounds.service';

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
    public sess:ManageSessionService,
    public sounds:SoundsService
  ) { }

  animateOnClick() {
    let elem = document.getElementById("pet");

    if (elem.style.backgroundPositionX == "-288px")
      elem.style.backgroundPosition = `0px 0px`;
    else 
      elem.style.backgroundPosition = `-288px 0px`;
  }

  animateScript() {
    let elem = document.getElementById("pet");
    var tID; //we will use this variable to clear the setInterval()
    var    position = 288; //start position for the image slicer
    const  interval = 300; //100 ms of interval for the setInterval()

    tID = setInterval ( () => {

      elem.style.backgroundPositionX = `-${position}px`;
      if (position < 576)
       { position += position;}
      //we increment the position by 256 each time
      else
        { position = 288; }

    }, interval );

  }

  ngOnInit(): void {
    //this.status.setFullBar(".bar-wrapper");
    //alert('init working');
   // sessionStorage.getItem("");
   this.sounds.playLoop(this.sounds.list().profile)
   this.animateScript();
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

    // alert("working");
    // this.status.setBar("experience",this.expBar);
    // this.status.setBar("health",100);
    // this.status.setBar("hunger",100);

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
    this.status.raiseBar('health',25);
    this.getAllBars();
  }

  GiveFood()
  {
    this.sounds.playOnce(this.sounds.list().eat)
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
