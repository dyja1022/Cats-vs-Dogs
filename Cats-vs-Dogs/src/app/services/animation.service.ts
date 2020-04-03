import { Injectable } from '@angular/core';


@Injectable()

export class AnimationService {
  frame = 0;
  player;
  enemy;

  //dog sprite sheet columns
  dog_ss = {
    idle:[50,108,179,236],
    walk: [50,113,176,240,303,371,434,496],
    strike: [50/*,113,176,240*/,303/*371*/],
    defeat: [/*50,113,176,235,*/305/*,388*/],
    row: {idle:24,walk:84,strike:985,defeat:280}
  };

//cat sprite sheet columns
  cat_ss = {
    idle:[20,85,149,213],
    walk:[20,85,149,213,276,342,405,470],
    strike: [20/*,85,149,213*/,276,/*342*/],
    defeat:[20,85,148,204,267,331,395],
    row: {idle:24,walk:88,strike:985,defeat:280}
  }

  constructor() { }

  init(){
    this.player = document.getElementById("player");
    this.enemy = document.getElementById("enemy");
  }

  AnimateCharacter(characterMovement,actor,row)
  {
    actor.style.backgroundPositionX = -(characterMovement[this.frame]) + 'px';
    
    actor.style.backgroundPositionY = -row+'px';

    //if you reach end of array, restart
    if(this.frame >= characterMovement.length)
    {
      this.frame = 0;
    }
    else
    {
      this.frame++;
    }
  }

  chooseAnimation(ss,box,motion)
  {
    switch(motion){
      case "idle":
        this.AnimateCharacter(ss.idle, box,ss.row.idle);
        break;
      case "walk":
        this.AnimateCharacter(ss.walk, box,ss.row.walk);
        break;
      case "strike":
        this.AnimateCharacter(ss.strike, box,ss.row.strike);
        break;
      case "defeat":
        this.AnimateCharacter(ss.defeat, box,ss.row.defeat);
        break;
    }
  }

}
