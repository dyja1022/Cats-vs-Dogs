import { Component, OnInit, HostListener } from '@angular/core';
import {ControlsService} from '../services/controls.service';
import { AnimationService } from '../services/animation.service';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { ManageStatusService } from '../services/manage-status.service';
import { SoundsService } from '../services/sounds.service';

// var num = 0;
// var direction = 1;
// var player,enemy;

// //dog sprite sheet columns
// var dog_ss = {
//   idle:[50,108,179,236],
//   walk: [],
//   strike: []
// };

// //cat sprite sheet columns
// var cat_ss = {
//   idle:[21,85,149,213],
//   walk:[],
//   strike: []
// }

// function init(){
//   player = document.getElementById("player");
//   enemy = document.getElementById("enemy");
// }

// //keydown events
// document.onkeydown = function(e)
// {
//   //if right arrow is pressed
//   if(e.keyCode == 39)
//   {
//     num+=10;
//     direction = 1;
//   }//if left arrow is pressed
//   else if(e.keyCode == 37)
//   {
//     num-=10;
//     direction = -1;
//   }
  
//   player.style.left =  (num +"px");

//   //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
//   player.style.transform = "matrix("+(2*direction)+",0,0,2,"+num+",0)";
// }

// var i = 0;
// setInterval(()=>
// {
  
//   AnimateCharacter(dog_ss.idle,player);
//   AnimateCharacter(cat_ss.idle,enemy);

//   //use switch statement to toggle between different animations
// },1000/5)

// function AnimateCharacter(characterMovement,actor)
// {
//   actor.style.backgroundPositionX = -(characterMovement[i]) + 'px';
//   //if you reach end of array, restart
//   if(i >= characterMovement.length)
//   {
//     i = 0;
//   }
//   else
//   {
//     i++;
//   }
// }

// function getPositionX(element) 
// { 
//   var rect = element.getBoundingClientRect();

//   return rect.x;
// } 

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  myTimer;
  player = {
    speed: 4,
    x: 250,
    y: 500
  }
  enemy = {
    speed: 4,
    x: 250,
    y: 500
  }
  
  healthBar;

  //dog sprite sheet columns
  dog_ss = {
    idle:[50,108,179,236],
    walk: [],
    strike: []
  };

//cat sprite sheet columns
  cat_ss = {
    idle:[21,85,149,213],
    walk:[],
    strike: []
  }

  constructor(private controls:ControlsService,
    public animate:AnimationService,
    public switchpage:SwitchPageService,
    public status:ManageStatusService,
    public sess:ManageSessionService,
    public sounds:SoundsService) { }

  ngOnInit(): void {
    this.controls.init();
    this.animate.init();
    this.sounds.playLoop(this.sounds.list().battle);
    //this.myTimer = setInterval(this.foo,1000/5);
  }

  foo()
  {
    //console.log("test")
    //this.animate.test();
    this.animate.AnimateCharacter(this.dog_ss.idle,this.player);
    this.animate.AnimateCharacter(this.cat_ss.idle,this.enemy);
  }


  ngAfterViewInit() { 
    // this.myTimer = setInterval(()=>{this.foo()},1000/5);

    this.status.setFullBar(".bar-wrapper");
  
    this.healthBar = this.sess.getHealth();
  
    this.status.setBar("health",this.healthBar);

    document.getElementById("player").style.left = this.player.x + "px";
  }

  LeaveBattle(){
    this.sounds.playOnce(this.sounds.list().flee);
    this.switchpage.changePage("traverse");
  }


  @HostListener('document:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    switch(event.keyCode)
    {
      case 37:
        this.player.x -= this.player.speed;
        document.getElementById("player").style.transform = "matrix(-2,0,0,2,0,0)";
        break;
      case 39:
        this.player.x += this.player.speed;
        document.getElementById("player").style.transform = "matrix(2,0,0,2,0,0)";
        break;
    }

    document.getElementById("player").style.left = this.player.x + "px";
  }

  ngOnDestroy(){
    //if die, die and reset health
    //else retrieve health

    this.sess.setHealth(this.healthBar);
  }

}
