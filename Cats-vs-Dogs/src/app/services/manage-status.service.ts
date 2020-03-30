import { Injectable } from '@angular/core';
import { ManageSessionService } from './manage-session.service';

@Injectable({
  providedIn: 'root'
})
export class ManageStatusService {

  bar:number;
  exp:number;
  fullbar:number;

  constructor(private  mss:ManageSessionService) { }

  setFullBar(selector){
    this.fullbar = document.querySelector(selector).clientWidth;
  }

  raiseBar(id,percent)
  {
    this.bar = this.getBar(id);
    // this.fullbar = document.querySelector(".bar-wrapper").clientWidth;
    // this.setFullBar("");
    
    this.bar += (this.fullbar*(percent/100));

    if(this.bar >= this.fullbar){
      this.setBar(this.fullbar);
      //document.getElementById(id).style.width = fullbar + "px";
    }else{
      document.getElementById(id).style.width  = this.bar + "px";
    }

    //document.getElementById(id).style.width  = this.bar + "px";
  }

  lowerBar(id,percent)
  {
    this.bar = this.getBar(id);
    //this.fullbar = document.querySelector(".bar-wrapper").clientWidth;
    
    this.bar -= (this.fullbar*(percent/100));

    if(this.bar <= 0){
      this.setBar(0);
    }else{
      document.getElementById(id).style.width  = this.bar + "px";
    }
  }

  getBar(id)
  {
    return document.getElementById(id).clientWidth;
  }

  setBar(percent)
  {
    // var fullbar = document.querySelector(".bar-wrapper").clientWidth;
    // this.bar = (fullbar*(percent/100));

    // document.getElementById("experience").style.width  = fullbar + "px";
    // document.getElementById("health").style.width  = fullbar + "px";
    // document.getElementById("hunger").style.width  = fullbar + "px";
  }

  addExp()
  {
    this.exp++;
  }

  getExp()
  {
    return this.exp;
  }

  //for whenever you have api access
  //saveExpToDatabase(value){}
}
