import { Injectable } from '@angular/core';
import {HostListener} from '@angular/core';

@Injectable()

export class ControlsService {

  constructor() { }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    // do something meaningful with it
    alert(`pressed ${event.keyCode}`);
  }

  init(){
    // player = document.getElementById("player");
    // enemy = document.getElementById("enemy");
  }


}
