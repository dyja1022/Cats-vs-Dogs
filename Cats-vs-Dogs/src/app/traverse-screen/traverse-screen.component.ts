import { Component, OnInit } from '@angular/core';
import {ControlsService} from '../services/controls.service';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';
import { ManageSessionService } from '../services/manage-session.service';
import {HostListener, /*KeyboardEvent*/} from '@angular/core';
import { empty } from 'rxjs';
import { AnimationService } from '../services/animation.service';


@Component({
  selector: 'app-traverse-screen',
  templateUrl: './traverse-screen.component.html',
  styleUrls: ['./traverse-screen.component.css']
})
export class TraverseScreenComponent implements OnInit {
  expBar;
  healthBar;
  hungerBar;

  player = {
    speed: 4,
    x: 250,
    y: 500,
    elem: null
  }

  constructor(
    private controls:ControlsService,
    private switchpage:SwitchPageService,
    public status:ManageStatusService,
    private sess:ManageSessionService,
    public anim:AnimationService
  ) { }

  ngOnInit(): void {
    this.controls.init();
  }
  

  ngAfterViewInit()
  {
    this.status.setFullBar(".bar-wrapper");
    this.getAllBars();

    //===================================
    this.expBar = this.sess.getExperience();
    this.healthBar = this.sess.getHealth();
    this.hungerBar = this.sess.getHunger();

    this.status.setBar("experience",this.expBar);
    this.status.setBar("health",this.healthBar);
    this.status.setBar("hunger",this.hungerBar);

    //===================================
    document.getElementById("player").style.left = this.player.x + "px";
    document.getElementById("player").style.top = this.player.y + "px"
    //this.player.x = this.player.elem.getBoundingClientRect.x;
  }

  //decrease hunger bar over time
  lowerHungerOverTime()
  { 
  } 

  lowerBar(id){
    this.status.lowerBar(id,5);
    this.getAllBars();
  }

  raiseBar(id){
    this.status.raiseBar(id,5);
    this.getAllBars();
  }

  getAllBars()
  {
    this.expBar =  this.status.getBarPercent("experience");
    this.healthBar = this.status.getBarPercent("health");
    this.hungerBar = this.status.getBarPercent("hunger");
  }
  
  //72.10884353741497
  ManagePet()
  {
    this.switchpage.changePage('pet')
  }

  startBattle(){
    this.switchpage.changePage('battle')
  }
  Logout()
  {
    this.switchpage.changePage('login')
  }


  @HostListener('document:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    switch(event.keyCode)
    {
      case 37:
        this.player.x -= this.player.speed;
         //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
        document.getElementById("player").style.transform = "matrix(-2,0,0,2,0,0)";
        break;
      case 38:
        this.player.y -= this.player.speed;
        break;
      case 39:
        this.player.x += this.player.speed;
        document.getElementById("player").style.transform = "matrix(2,0,0,2,0,0)";
        break;
      case 40:
        this.player.y += this.player.speed;
        break;
    }
    // console.log("in document: "+document.getElementById("player").style.left);
    // console.log("in code: "+this.player.x);

    this.anim.setSpriteSheetRow(document.getElementById("player"),this.anim.dog_ss.row[1]);
    this.anim.AnimateCharacter(this.anim.dog_ss.walk, document.getElementById("player"));
    
    //this.player.elem.style.left = this.player.x + "px";
    document.getElementById("player").style.left = this.player.x + "px";
    document.getElementById("player").style.top = this.player.y + "px";

    //document.getElementById("player").style.transform = "matrix("+(2*1)+",0,0,2,"+this.player.x+",0)";
  }

  ngOnDestroy()
  {
    //alert("experience: "+this.expBar+", health: "+this.healthBar+", hunger: "+this.hungerBar);

    this.sess.setExperience(this.expBar);
    this.sess.setHealth(this.healthBar);
    this.sess.setHunger(this.hungerBar);
  }
}
