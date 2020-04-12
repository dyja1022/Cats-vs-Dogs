import { Component, OnInit } from '@angular/core';
import {ControlsService} from '../services/controls.service';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';
import { ManageSessionService } from '../services/manage-session.service';
import {HostListener, /*KeyboardEvent*/} from '@angular/core';
import { empty } from 'rxjs';
import { AnimationService } from '../services/animation.service';
import { SoundsService } from '../services/sounds.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-traverse-screen',
  templateUrl: './traverse-screen.component.html',
  styleUrls: ['./traverse-screen.component.css']
})
export class TraverseScreenComponent implements OnInit {
  hungerTimer;
  movementTimer;
  expBar;
  healthBar;
  hungerBar;

  player = {
    speed: 8,
    x: 250,
    y: 500,
    hp:5,
    box: null,
    animal: null,
    currentMotion: "idle"
  }
  

  constructor(
    private controls:ControlsService,
    private switchpage:SwitchPageService,
    public status:ManageStatusService,
    private sess:ManageSessionService,
    public anim:AnimationService,
    public sounds:SoundsService
  ) { }

  ngOnInit(): void {
    this.controls.init();
    this.sounds.playLoop(this.sounds.list().home);
  }
  

  ngAfterViewInit()
  {
    this.status.setFullBar(".bar-wrapper");
    this.getAllBars();

    this.player.animal = this.anim.dog_ss;
    //===================================
    this.expBar = this.sess.getExperience();
    this.healthBar = this.sess.getHealth();
    this.hungerBar = this.sess.getHunger();

    this.status.setBar("experience",this.expBar);
    this.status.setBar("health",this.healthBar);
    //this.status.setBar("health",100)
    this.status.setBar("hunger",this.hungerBar);

    this.lowerHungerOverTime();
    

    this.player.box = document.getElementById("player");
    //===================================
    this.player.box.style.left = this.player.x + "px";
    this.player.box.style.top = this.player.y + "px"

    this.CheckMovement();
    //this.player.x = this.player.elem.getBoundingClientRect.x;
  }

  //decrease hunger bar over time
  lowerHungerOverTime()
  { 
    this.hungerTimer = setInterval(()=>{
      this.status.lowerBar("hunger",2);
      this.getAllBars();

      if(this.status.getBarPercent("hunger") <= 0){
        //half the hp
        //lower health
        this.status.lowerBar("health",1)
      }
      if(this.status.getBarPercent("health") <= 0){
        //alert("you died");
       // this.anim.chooseAnimation(this.player.animal,this.player.box,"defeat");

        this.anim.AnimateCharacter(this.player.animal.defeat,this.player.box,this.player.animal.row.defeat);
        alert("you died");
        this.status.setBar("health",100)
      }
    },2000);
  }

  CheckMovement()
  {
    this.movementTimer = setInterval(()=>
    {
      if(this.controls.isMoveLeft){
        this.MoveHorizontal(-1);
      }
      else if(this.controls.isMoveRight){
        this.MoveHorizontal(1);
      }

      if(this.controls.isMoveUp){
        this.MoveVertical(-1);
      }
      else if(this.controls.isMoveDown)
      {
        this.MoveVertical(1);
      }
    },1000/20);
  }

  lowerBar(id)
  {
    this.status.lowerBar(id,5);
    this.getAllBars();
  }

  raiseBar(id)
  {
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
    
    this.switchpage.changePage('battle');
  }
  Logout()
  {
    sessionStorage.removeItem('id')
    this.switchpage.changePage('login')
  }

  MoveHorizontal(direction){
    this.player.x += (direction)*this.player.speed;
    //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
    this.player.box.style.transform = `matrix(${direction*2},0,0,2,${direction*10},0)`;
    this.anim.chooseAnimation(this.player.animal, this.player.box,"walk");


    this.player.box.style.left = this.player.x + "px";
  }

  MoveVertical(direction){
    this.player.y += (direction)*this.player.speed;
    this.anim.chooseAnimation(this.player.animal, this.player.box,"walk");

    this.player.box.style.top = this.player.y + "px";
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    switch(event.keyCode)
    {
      case 32:
        break;
      case 37: //left arrow
       // this.MoveHorizontal(-1);
        this.controls.isMoveLeft = true;
        break;
      case 38: //up arrow
        //this.MoveVertical(-1);
        this.controls.isMoveUp = true;
        break;
      case 39: //right arrow
        //this.MoveHorizontal(1);
        this.controls.isMoveRight = true;
        break;
      case 40: //down arrow
        //this.MoveVertical(1);
        this.controls.isMoveDown = true;
        break;
    }
    //move
    // this.player.box.style.left = this.player.x + "px";
    // this.player.box.style.top = this.player.y + "px";
  }


  @HostListener('document:keyup', ['$event'])
  onKeyUp(event:KeyboardEvent) {
    switch(event.keyCode)
    {
      case 32:
        break;
      case 37: //left arrow
        this.controls.isMoveLeft = false
        break;
      case 38: //up arrow
        this.controls.isMoveUp = false
        break;
      case 39: //right arrow
        this.controls.isMoveRight = false
        break;
      case 40: //down arrow
        this.controls.isMoveDown = false
        break;
    }
  }

  ngOnDestroy()
  {
    clearInterval(this.hungerTimer);
    clearInterval(this.movementTimer)

    this.sess.setExperience(this.expBar);
    this.sess.setHealth(this.healthBar);
    this.sess.setHunger(this.hungerBar);
  }
}
