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

  //dog sprite sheet columns
  dog_ss = {
    idle:[50,108,179,236],
    walk: [50,113,176,240,303,371,434,496],
    strike: [],
    defeat: [],
    row: [24,84]
  };

//cat sprite sheet columns
  cat_ss = {
    idle:[21,85,149,213],
    walk:[],
    strike: []
  }

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

  setSpriteSheetRow(actor,row){
    actor.style.backgroundPositionY = -row+'px';
  }

  getPositionX(element) 
  { 
    var rect = element.getBoundingClientRect();

    return rect.x;
  } 
}
