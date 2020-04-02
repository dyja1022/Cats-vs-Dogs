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
    
    this.bar += (this.fullbar*(percent/100));

    if(this.bar >= this.fullbar)
    {
      document.getElementById(id).style.width = this.fullbar +1+ "px";
    }else{
      document.getElementById(id).style.width  = this.bar + "px";
    }

  }

  lowerBar(id,percent)
  {
    this.bar = this.getBar(id);
    
    this.bar -= (this.fullbar*(percent/100));

    if(this.bar <= 0){
      document.getElementById(id).style.width = "0px";
    }else{
      document.getElementById(id).style.width  = this.bar + "px";
    }
  }

  getBar(id)
  {
    return document.getElementById(id).clientWidth;
  }

  resetBar()
  {
    //document.getElementById(".bar").style.width = this.fullbar + "px";
  }

  setBar(id,percent){
    this.bar = this.getBar(id);
    
    this.bar = (this.fullbar*(percent/100));

    document.getElementById(id).style.width = this.bar + "px";
  }

  getBarPercent(id){
    this.bar = this.getBar(id);

    return (this.bar/this.fullbar)*100;
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
