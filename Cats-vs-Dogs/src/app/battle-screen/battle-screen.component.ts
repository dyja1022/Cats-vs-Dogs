import { Component, OnInit } from '@angular/core';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';

var num = 0;
var player = document.getElementById("player");
var starttime;

//dog sprite sheet rows
var dog_ss = {
  idle:[50,108,179,236],

};

document.onkeydown = function(e)
{
 // alert('test')
  if(e.keyCode == 39){
    num+=10;
   // document.getElementById("player").style.transform = "scale(2)";
  }
  else if(e.keyCode == 37){
    //no more character flips, a true warrior doesn't turn their back to the enemy

    //document.getElementById("player").style.transform = "scaleX(-2)";
    //document.getElementById("player").style.transform = "scaleY()";
    num-=10;
  }
  
  document.getElementById("player").style.left =  (num +"px");
}

var i = 0;
setInterval(()=>{
  //document.getElementById("player").style.backgroundPositionY = "-84px";
 // document.getElementById("player").style.backgroundPositionX = "-108px";
 /*
  document.getElementById("player").style.backgroundPositionX = -(dog_ss.idle[i]) + 'px';
  if(i >= dog_ss.idle.length){
    i = 0;
  }else{
    i++;
  }*/
  AnimateCharacter(dog_ss.idle);
},1000/5)


function AnimateCharacter(characterMovement){
  document.getElementById("player").style.backgroundPositionX = -(characterMovement[i]) + 'px';
  //if you reach end of array, restart
  if(i >= characterMovement.length){
    i = 0;
  }else{
    i++;
  }
}







@Component({
  selector: 'app-battle-screen',
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
