import { Component, OnInit, HostListener } from '@angular/core';
import {ControlsService} from '../services/controls.service';
import { AnimationService } from '../services/animation.service';
import { SwitchPageService } from '../services/switch-page.service';
import { ManageSessionService } from '../services/manage-session.service';
import { ManageStatusService } from '../services/manage-status.service';
import { SoundsService } from '../services/sounds.service';
import { AccountService } from '../services/account.service';
import { UserStats } from '../interfaces/user-stats'
import { ModalService } from '../_modal';

@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  myTimer;
  enemyTimer;
  healthBar;
  expBar;
  timeout:number =  1000/2;

  playStats:UserStats;

  userStats = {
    experience: null,
    wins: null,
    loss: null,
    totalBattles:null,
    userid:null,
    affiliation: null
  }

  stopEnemy: boolean;
  
  player = {
    speed: 10,
    x: 250,
    y: 500,
    hp:5,
    box: null,
    animal: null,
    currentMotion: "idle",
    framerate: 1000/8
  }
  enemy = {
    speed: 4,
    x: 500,
    y: 500,
    hp:5,
    box: null,
    animal: null,
    currentMotion: "idle",
    framerate: 1000/8
  }
  
  // modal
  modalTitle:string;
  modalBody:string;

  constructor(private controls:ControlsService,
    public anim:AnimationService,
    public switchpage:SwitchPageService,
    public status:ManageStatusService,
    public sess:ManageSessionService,
    public sounds:SoundsService,
    private account:AccountService,
    private modalService: ModalService,
    ) { }

  ngOnInit(): void {
    this.stopEnemy = false;
    this.controls.init();
    this.sounds.playLoop(this.sounds.list().battle);
  }


  ngAfterViewInit()
  { 
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

    this.setStats();

    this.startAnimate();
  }

  setStats()
  {
    this.userStats.experience = Number(sessionStorage.getItem("expLevel"));
    this.userStats.wins = Number(sessionStorage.getItem("win"));
    this.userStats.totalBattles =  Number(sessionStorage.getItem("totalBattles"));
    this.userStats.loss = Number(sessionStorage.getItem("loss"));
  }

  startAnimate()
  {
    this.myTimer = setInterval(()=>{
      if(this.controls.isMoveLeft){
        this.MoveHorizontal(-1);
      }
      else if(this.controls.isMoveRight){
        this.MoveHorizontal(1);
      }

      this.updateAnimation(this.player,this.player.currentMotion);
    },this.player.framerate);

    this.enemyTimer = setInterval(()=>{
      this.updateAnimation(this.enemy, this.enemy.currentMotion);
    },this.enemy.framerate);    
  }

  //updateAnimation(this.player.currentMotion,"idle") //old
  //new updateAnimation(this.player, "idle") //have to call it for each actor
  updateAnimation(actor,motion)
  {
    if(actor == this.player)
    {
      this.player.currentMotion = motion;
    }
    else
    {
      this.enemy.currentMotion = motion;

      //if stopEnemy is set to false, meaning enemy should be moving
      //then call enemy AI
      if (!this.stopEnemy) 
      {
        this.EnemyAI();
      }
    }

    this.anim.chooseAnimation(actor.animal,actor.box,motion);
  }

  LeaveBattle(){
    this.sounds.playOnce(this.sounds.list().flee);
    this.switchpage.changePage("traverse");
  }

  calculateDistance()
  {
    var squared = (this.player.x - this.enemy.x)*(this.player.x - this.enemy.x);
    return Math.sqrt(squared);
  }

  isStrikingDistance()
  {
    if(this.calculateDistance() <= 30)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  /* Modal functions */
  openModal(id: string, title: string, body: string) {
    this.modalTitle = title;
    this.modalBody = body;
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
      this.switchpage.changePage("pet");
  }

  //controls enemy actions
  EnemyAI()
  {
    var random =  Math.floor(Math.random() * Math.floor(8));

    console.log("outside");
    
    //if enemy is within striking distance, and random number is 1 or 3, attack
    if(this.isStrikingDistance())
    {
      // alert("yes")
      this.enemy.currentMotion = "idle";
      setTimeout(()=>
      {
        if(random == 1 || random == 3)
        {
          this.EnemyAttack();
        }
        else
        {
          this.enemy.currentMotion = "idle";
        }
      },1000/3)
    }
    
    this.EnemyApproach();
  }

  //controls enemy walk and direction
  EnemyApproach()
  {
    //if, else if determines direction enemy takes
    if((this.enemy.x-this.player.x) >= 26)
    {
      this.enemy.x -= this.enemy.speed;
      this.enemy.box.style.transform = "matrix(-2,0,0,2,0,0)";
      this.enemy.currentMotion = "walk";
    }
    else if((this.enemy.x-this.player.x) <= -26)
    {
      this.enemy.x += this.enemy.speed;
      this.enemy.box.style.transform = "matrix(2,0,0,2,0,0)";
      this.enemy.currentMotion = "walk";
    }

    this.enemy.box.style.left = this.enemy.x + "px";

  }

  EnemyAttack()
  {
    //play animation
    this.enemy.currentMotion = "strike";
    //lower player health
    this.status.lowerBar("health",this.enemy.hp);

    this.CheckIfPlayerWon();
  }

  Win()
  {
    this.healthBar = this.status.getBarPercent("health");
    //increment wins and number of battles by 1
 
    this.expBar = Number(this.sess.getExperience())+30;
    this.userStats.wins++;
    this.userStats.totalBattles++;

    //increment experience number and set experience bar
    if(this.expBar >= 100)
    {
      var remain = this.expBar - 100;
      this.sess.setExperience(remain);

      //increment experience
      this.userStats.experience++;
    }else{
      this.sess.setExperience(this.expBar);
    }
    
    //increment win and number of battles
    sessionStorage.setItem("expLevel",this.userStats.experience.toString());
    sessionStorage.setItem("win",this.userStats.wins.toString());
    sessionStorage.setItem("totalBattles",this.userStats.totalBattles.toString());

    this.updateStats();

    this.openModal('battlescreen', 'You win', '');
    //alert("You win!");

  }

  Lose()
  {
    this.stopEnemy=true;
    //set bar back to full
    this.healthBar = this.status.setBar("health",100);

    //increment loss and number of battles by 1

    this.userStats.loss++;
    this.userStats.totalBattles++;

    sessionStorage.setItem("loss",this.userStats.loss.toString());
    sessionStorage.setItem("totalBattles",this.userStats.totalBattles.toString());

    this.updateStats();

    this.openModal('battlescreen', 'You lose', '');
    //alert("You win!");

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
  }

  Omaewa() {
    this.stopEnemy = true;  // stop enemy ai

    let enemyDir = this.enemy.box.style.transform;
    // enemy facing left
    if (enemyDir == "matrix(-2, 0, 0, 2, 0, 0)") {
      this.player.x = this.enemy.x + (this.player.speed * 8); // teleports behind you
      this.player.box.style.transform = "matrix(-2,0,0,2,-10,0)";
      console.log('aa');
    }
    // enemy facing right
    else if (enemyDir == "matrix(2, 0, 0, 2, 0, 0)") {
      this.player.x = this.enemy.x - (this.player.speed * 8); // teleports behind you
      this.player.box.style.transform = "matrix(2,0,0,2,10,0)";
      console.log('bb');
    }

    let background = document.getElementById("battle-map");

    setTimeout(() => { 
      background.style.filter = 'invert(25%) sepia(94%) saturate(5316%) hue-rotate(357deg) brightness(107%) contrast(96%) blur(1px)';
      //background.style.transition = '3s'
      }, 4000); 

    setTimeout(() => {
           background.style.filter = 'none'
           this.status.lowerBar("enemy-health",100)
           this.sounds.resume();
           this.CheckIfPlayerWon();
          }, 9500);
  }

  MoveHorizontal(direction){
    this.player.x += (direction)*this.player.speed;
    //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
    this.player.box.style.transform = `matrix(${direction*2},0,0,2,${direction*10},0)`;
    //this.player.currentMotion = "walk";
    this.player.box.style.left = this.player.x + "px";
  }

  //calls update from account service 
  async updateStats()
  {
    this.userStats.userid = Number(sessionStorage.getItem('id'));
    var Stats = await this.account.updateStats(this.userStats)
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) 
  {
    switch(event.keyCode)
    {
      // up arrow key
      case 38:
        this.sounds.pause(); // stop musci
        this.sounds.playOnce(this.sounds.list().nani) // play nani
        this.Omaewa();
        break;
      case 32: //space bar, strike
        //play animation
        console.log(this.enemy.box.style.transform);
        this.player.currentMotion = "strike";

        setTimeout(()=>{
          this.player.currentMotion = "idle";
        },this.timeout)

        break;
      case 37: //left arrow, move left
        this.player.currentMotion = "walk";
        this.controls.isMoveLeft = true;
        break;
      case 39: //right arrow, right left
        this.player.currentMotion = "walk";
        this.controls.isMoveRight = true;
        break;
    }

    this.player.box.style.left = this.player.x + "px";

    this.CheckIfPlayerWon();
  }

  @HostListener('document:keyup', ['$event'])
  OnKeyUp(event:KeyboardEvent)
  {
    switch(event.keyCode)
    {
      case 32:
        if(this.isStrikingDistance())
        {
          this.status.lowerBar("enemy-health",this.player.hp)
        }
        break;
        case 37:
          this.controls.isMoveLeft = false;
          this.player.currentMotion = "idle";
          break;
        case 39://left arrow, move left
          this.controls.isMoveRight = false;
          this.player.currentMotion = "idle";
        break;
    }
  }

  ngOnDestroy()
  {
    clearInterval(this.myTimer);
    clearInterval(this.enemyTimer);

    this.sess.setHealth(this.healthBar);
  }
}
