import { Injectable } from '@angular/core';
import { AfterViewInit, Component, ElementRef} from '@angular/core';

/*
document.addEventListener("keypress", function(){
  alert("hi")
});*/

var num = 0;
var direction = 1;
var player,enemy;


// window.onload = function(){
//   init();
// }

//keydown events
document.onkeydown = function(e)
{
  //if right arrow is pressed
  if(e.keyCode == 39)
  {
    num+=10;
    direction = 1;
  }//if left arrow is pressed
  else if(e.keyCode == 37)
  {
    num-=10;
    direction = -1;
  }
  
  movePlayer();
}

function movePlayer()
{
  player.style.left =  (num +"px");

  //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
  player.style.transform = "matrix("+(2*direction)+",0,0,2,"+num+",0)";
}

@Injectable()

export class ControlsService {

  constructor() { }

  init(){
    player = document.getElementById("player");
    enemy = document.getElementById("enemy");
  }
}
