import { Component, OnInit } from '@angular/core';

var num = 0;

document.onkeydown = function(e)
{
 // alert('test')
  if(e.keyCode == 39){
    num+=10;
  }
  else if(e.keyCode == 37){
    num-=10;
  }
  
  document.getElementById("player").style.left =  (num +"px");
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
