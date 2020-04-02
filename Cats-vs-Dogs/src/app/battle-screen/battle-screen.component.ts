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

  constructor(private controls:ControlsService,
    public anim:AnimationService,
    public switchpage:SwitchPageService,
    public status:ManageStatusService,
    public sess:ManageSessionService) { }

  ngOnInit(): void {
    this.controls.init();
    this.anim.init();
    //this.myTimer = setInterval(this.foo,1000/5);
  }

  startAnimate()
  {

    this.anim.AnimateCharacter(this.anim.dog_ss.idle, document.getElementById("player"));
    this.anim.AnimateCharacter(this.anim.cat_ss.idle, document.getElementById("enemy"));
  }


  ngAfterViewInit() { 
    this.myTimer = setInterval(()=>{this.startAnimate()},1000/5);

    this.status.setFullBar(".bar-wrapper");
  
    this.healthBar = this.sess.getHealth();
  
    this.status.setBar("health",this.healthBar);

    document.getElementById("player").style.left = this.player.x + "px";
  }

  LeaveBattle(){
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
    clearInterval(this.myTimer);
    this.sess.setHealth(this.healthBar);
  }

}
