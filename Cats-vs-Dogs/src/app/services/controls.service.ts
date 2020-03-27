import { Injectable } from '@angular/core';
import { AfterViewInit, Component, ElementRef} from '@angular/core';

/*
document.addEventListener("keypress", function(){
  alert("hi")
});*/

var num = 0;
var direction = 1;
var player,enemy;

var character = {
  speed: 4,
  posX: 0,
  posY: 0
}


window.onload = function()
{
  character.posY = getPositionY(player);
}

//keydown events
document.onkeydown = function(e)
{
  //if right arrow is pressed
  // if(e.keyCode == 39)
  // {
  //   num+=10;
  //   direction = 1;
  // }//if left arrow is pressed
  // else if(e.keyCode == 37)
  // {
  //   num-=10;
  //   direction = -1;
  // }
  switch(e.keyCode)
  {
    case 37: //left arrow
      character.posX -= character.speed;
      direction = -1;
      player.style.left =  (character.posX +"px");
      break;
    case 38: //up arrow
      character.posY -= character.speed;
      player.style.top =  (character.posY +"px");
      break;
    case 39: //right arrow
      character.posX += character.speed;
      direction = 1;
      player.style.left =  (character.posX +"px");
      break;
    case 40: //down arrow
      character.posY += character.speed;
      player.style.top =  (character.posY +"px");
      break;
  }
  
  movePlayer();
  
}

function movePlayer()
{
  //player.style.left =  (num +"px");

  //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
  //player.style.transform = "matrix("+(2*direction)+",0,0,2,"+num+",0)";
  player.style.transform = "matrix("+(2*direction)+",0,0,2,"+character.posX+",0)";
}

function getPositionX(element) 
{ 
  var rect = element.getBoundingClientRect();
  return rect.x;
} 

function getPositionY(element) 
{ 
  var rect = element.getBoundingClientRect();
  return rect.y;
} 

@Injectable()

export class ControlsService {

  constructor() { }

  init(){
    player = document.getElementById("player");
    enemy = document.getElementById("enemy");
  }
}
