import { Component, OnInit } from '@angular/core';
import {ControlsService} from '../services/controls.service';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageStatusService } from '../services/manage-status.service';
import { ManageSessionService } from '../services/manage-session.service';
import {HostListener, /*KeyboardEvent*/} from '@angular/core';
import { empty } from 'rxjs';
import { AnimationService } from '../services/animation.service';
import { SoundsService } from '../services/sounds.service';

/*
var direction = 1;
var player;

var character = {
  speed: 4,
  posX: 0,
  posY: 0
}

//dog sprite sheet columns
var dog_ss = {
  idle:[50,108,179,236],
  walk: [50,113,176,240,303,371,434,496],
  strike: [],
  defeat: [],
  row: [24,84]
};

function init(){
  player = document.getElementById("player");
  
  //set to sprite sheet to second row
  player.style.backgroundPositionY = -(dog_ss.row[1]) + 'px';
 // character.posX = getPositionX(player);
  character.posY = getPositionY(player);

  alert(character.posX);
}
//keydown events
document.onkeydown = function(e)
{
  switch(e.keyCode)
  {
    case 37: //left arrow
      character.posX -= character.speed;
      direction = -1;
      player.style.left =  (character.posX +"px");
      break;
    case 38: //up arrow
      character.posY -= character.speed;
      player.style.top =  (character.posY +"px");
      break;
    case 39: //right arrow
      character.posX += character.speed;
      direction = 1;
      player.style.left =  (character.posX +"px");
      break;
    case 40: //down arrow
      character.posY += character.speed;
      player.style.top =  (character.posY +"px");
      break;
  }

 // alert(character.posX)
  AnimateCharacter(dog_ss.walk, player);
  //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
  player.style.transform = "matrix("+(2*direction)+",0,0,2,"+character.posX+",0)";
}
/*
var i = 0;
setInterval(()=>
{
  
  //AnimateCharacter(dog_ss.walk,player);

  //use switch statement to toggle between different animations
},1000/5)

var i = 0;
function AnimateCharacter(characterMovement,actor)
{
  //loop through sprite sheet columns
  actor.style.backgroundPositionX = -(characterMovement[i]) + 'px';
  //if you reach end of array, restart
  if(i >= characterMovement.length)
  {
    i = 0;
  }
  else
  {
    i++;
  }
}


function getPositionX(element) 
{ 
  var rect = element.getBoundingClientRect();
  return rect.x;
} 

function getPositionY(element) 
{ 
  var rect = element.getBoundingClientRect();
  return rect.y;
} 
*/

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
    public anim:AnimationService,
    public sounds:SoundsService
  ) { }

  ngOnInit(): void {
    this.controls.init();
    this.sounds.playLoop(3);
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
    console.log("in document: "+document.getElementById("player").style.left);
    console.log("in code: "+this.player.x);
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
