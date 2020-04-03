import { Component, OnInit, HostListener } from '@angular/core';
import {ControlsService} from '../services/controls.service';
import { AnimationService } from '../services/animation.service';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { ManageStatusService } from '../services/manage-status.service';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  myTimer;
  enemyTimer;
  healthBar;
  strikingDistance: boolean;
  
  player = {
    speed: 4,
    x: 250,
    y: 500,
    hp:5,
    box: null,
    animal: null,
    currentMotion: "idle"
  }
  enemy = {
    speed: 4,
    x: 500,
    y: 500,
    hp:5,
    box: null,
    animal: null,
    currentMotion: "idle"
  }
  

  constructor(private controls:ControlsService,
    public anim:AnimationService,
    public switchpage:SwitchPageService,
    public status:ManageStatusService,
    public sess:ManageSessionService) { }

  ngOnInit(): void {
    this.controls.init();
    this.anim.init();
  }

  ngAfterViewInit()
  { 
    this.startAnimate();
    //set bars
    this.status.setFullBar(".bar-wrapper");
  
    this.healthBar = this.sess.getHealth();
  
    this.status.setBar("health",this.healthBar);

    //get player elements
    this.player.box = document.getElementById("player");
    this.enemy.box = document.getElementById("enemy");

    //set player and enemy animal 
    this.player.animal = this.anim.dog_ss;
    this.enemy.animal = this.anim.cat_ss;

    //set player and enemy positions
    this.player.box.style.top = this.player.y + "px";
    this.enemy.box.style.top = this.enemy.y + "px";
    this.player.box.style.left = this.player.x + "px";
    this.enemy.box.style.left = this.enemy.x + "px";
  }

  startAnimate()
  {
    this.updateAnimation("idle","idle")
  }

  updateAnimation(playerMotion,enemyMotion)
  {
    this.stopTimer();
    this.myTimer = setInterval(()=>{
      if(playerMotion != this.player.currentMotion){
        this.player.currentMotion = playerMotion;
      }
      if(enemyMotion != this.enemy.currentMotion){
        this.enemy.currentMotion = enemyMotion;
      }

      this.anim.chooseAnimation(this.player.animal,this.player.box,this.player.currentMotion);
      this.anim.chooseAnimation(this.enemy.animal,this.enemy.box,this.enemy.currentMotion);

      this.EnemyAI();
    },1000/5);
  }

  stopTimer()
  {
    clearInterval(this.myTimer);
  }

  LeaveBattle(){
    this.switchpage.changePage("traverse");
  }

  calculateDistance()
  {
    var squared = (this.player.x - this.enemy.x)*(this.player.x - this.enemy.x);
    return Math.sqrt(squared);
  }

  // chooseAnimation(ss,box,motion)
  // {
  //   switch(motion){
  //     case "idle":
  //       this.anim.AnimateCharacter(ss.idle, box,ss.row.idle);
  //       //this.myTimer = setInterval(()=>{this.anim.AnimateCharacter(ss.idle, box,ss.row.idle);},1000/5);
  //       break;
  //     case "walk":
  //       this.anim.AnimateCharacter(ss.walk, box,ss.row.walk);
  //       break;
  //     case "strike":
  //       this.anim.AnimateCharacter(ss.strike, box,ss.row.strike);
  //       break;
  //     case "defeat":
  //       this.anim.AnimateCharacter(ss.defeat, box,ss.row.defeat);
  //       break;
  //   }
  // }

  isStrikingDistance()
  {
    if(this.calculateDistance() <= 30)
    {
      this.strikingDistance = true;
    }
    else
    {
      this.strikingDistance = false;
    }

    return this.strikingDistance;
  }


  EnemyAI(){
    var random = Math.floor(Math.random() * Math.floor(8));
    //console.log(random);
    if(this.isStrikingDistance()){
      if(random == 1 || random == 3){
        this.EnemyAttack()
      }
      else{
        this.updateAnimation(this.player.currentMotion,"idle");
      }
    }
    
    this.EnemyApproach();
  }

  EnemyApproach(){
    //this.enemy.x -= this.enemy.speed;
    //this.enemy.box.style.transform = "matrix(-2,0,0,2,0,0)";

    console.log((this.player.x-this.enemy.x))
    if((this.enemy.x-this.player.x) >= 26)
    {
      this.enemy.x -= this.enemy.speed;
      this.enemy.box.style.transform = "matrix(-2,0,0,2,0,0)";

    }
    else if((this.enemy.x-this.player.x) <= -26){
      this.enemy.x += this.enemy.speed;
      this.enemy.box.style.transform = "matrix(2,0,0,2,0,0)";
    }
    this.enemy.box.style.left = this.enemy.x + "px";
    
  }

  EnemyAttack()
  {
    //play animation
    this.updateAnimation(this.player.currentMotion,"strike");
    //lower player health
    this.status.lowerBar("health",this.enemy.hp);

    this.CheckIfPlayerWon();
  }

  Win()
  {
    alert("You win!");
    this.healthBar = this.status.getBarPercent("health");
    this.switchpage.changePage("pet");
  }

  Lose()
  {
    alert("You lose");
    this.healthBar = this.status.setBar("health",100);
    this.switchpage.changePage("traverse");
  }

  CheckIfPlayerWon()
  {
    if(this.status.getBarPercent("health") <= 0)
    {
      this.Lose();
    }
    else if(this.status.getBarPercent("enemy-health") <= 0)
    {
      this.Win();
    }

    // console.log(this.status.getBarPercent("enemy-health"));
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) 
  {
   // this.stopTimer();
    switch(event.keyCode)
    {
      case 32:
        //play animation
        this.updateAnimation("strike",this.enemy.currentMotion);
        //this.chooseAnimation(this.player.animal,this.player.box,"strike");
        //if within striking distance, lower enemy health
        // if(this.isStrikingDistance()){
        //   this.status.lowerBar("enemy-health",this.player.hp)
        // }
        break;
      case 37:
        this.player.x -= this.player.speed;
        this.player.box.style.transform = "matrix(-2,0,0,2,-10,0)";
        //this.updateAnimation("walk",this.enemy.currentMotion);
        break;
      case 39:
        this.player.x += this.player.speed;
        this.player.box.style.transform = "matrix(2,0,0,2,10,0)";
        //this.updateAnimation("walk",this.enemy.currentMotion);
        break;
    }

    this.player.box.style.left = this.player.x + "px";

    this.CheckIfPlayerWon();

    //this.startTimer();
  }

  @HostListener('document:keyup', ['$event'])
  OnKeyUp(event:KeyboardEvent)
  {
    switch(event.keyCode)
    {
      case 32:
       // this.chooseAnimation(this.player.animal,this.player.box,"strike");
        if(this.isStrikingDistance()){
          this.status.lowerBar("enemy-health",this.player.hp)
        }
        break;
    }
    this.updateAnimation("idle",this.enemy.currentMotion);
   // this.startTimer();
  }


  ngOnDestroy(){
    //if die, die and reset health
    //else retrieve health
    clearInterval(this.myTimer);
    //this.stopTimer();
    this.sess.setHealth(this.healthBar);
  }
}
