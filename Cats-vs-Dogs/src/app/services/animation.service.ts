import { Injectable } from '@angular/core';

/*
@Injectable({
  providedIn: 'root'
})*/

@Injectable()

export class AnimationService {
  i = 0;
  player;
  enemy;

  constructor() { }

  init(){
    this.player = document.getElementById("player");
    this.enemy = document.getElementById("enemy");
  }

  AnimateCharacter(characterMovement,actor)
  {
    actor.style.backgroundPositionX = -(characterMovement[this.i]) + 'px';
    //if you reach end of array, restart
    if(this.i >= characterMovement.length)
    {
      this.i = 0;
    }
    else
    {
      this.i++;
    }
  }

  getPositionX(element) 
  { 
    var rect = element.getBoundingClientRect();

    return rect.x;
  } 
}
