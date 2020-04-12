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

    this.setStats();
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

      if (!this.stopEnemy) {
        this.EnemyAI();
      }
    },1000/5);
  }

  stopTimer()
  {
    clearInterval(this.myTimer);
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
    var random = Math.floor(Math.random() * Math.floor(8));
    
    //if enemy is within striking distance, and random number is 1 or 3, attack
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

  //controls enemy walk and direction
  EnemyApproach()
  {
    if((this.enemy.x-this.player.x) >= 26)
    {
      this.enemy.x -= this.enemy.speed;
      this.enemy.box.style.transform = "matrix(-2,0,0,2,0,0)";
    }
    else if((this.enemy.x-this.player.x) <= -26)
    {
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
        this.updateAnimation("strike",this.enemy.currentMotion);
        break;
      case 37: //left arrow, move left
        this.player.x -= this.player.speed;
        this.player.box.style.transform = "matrix(-2,0,0,2,-10,0)";
        break;
      case 39: //right arrow, right left
        this.player.x += this.player.speed;
        this.player.box.style.transform = "matrix(2,0,0,2,10,0)";
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
    }
    this.updateAnimation("idle",this.enemy.currentMotion);
  }

  ngOnDestroy()
  {
    this.stopTimer();
    this.sess.setHealth(this.healthBar);
  }
}
