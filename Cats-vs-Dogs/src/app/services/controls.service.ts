import { Injectable } from '@angular/core';
import {HostListener} from '@angular/core';

@Injectable()

export class ControlsService {
  isMoveRight:boolean  = false;
  isMoveLeft:boolean = false;
  isMoveUp:boolean = false;
  isMoveDown:boolean = false;

  constructor() { }

  init(){
    // player = document.getElementById("player");
    // enemy = document.getElementById("enemy");
  }

}
