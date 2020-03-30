import { Injectable } from '@angular/core';
import { ManageSessionService } from './manage-session.service';

@Injectable({
  providedIn: 'root'
})
export class ManageStatusService {

  bar:number;
  exp:number;

  constructor(private  mss:ManageSessionService) { }

  raiseBar(id,percent)
  {
    this.bar = this.getBar(id);
    var fullbar = document.querySelector(".bar-wrapper").clientWidth;
    
    this.bar += (fullbar*(percent/100));

    if(this.bar >= fullbar){
      this.setBar(fullbar);
    }

    document.getElementById(id).style.width  = this.bar + "px";
  }

  lowerBar(id,percent)
  {
    this.bar = this.getBar(id);
    var fullbar = document.querySelector(".bar-wrapper").clientWidth;
    
    this.bar -= (fullbar*(percent/100));

    if(this.bar <= 0){
      this.setBar(0);
    }
    
    document.getElementById(id).style.width  = this.bar + "px";
  }

  getBar(id)
  {
    return document.getElementById(id).clientWidth;
  }

  setBar(num)
  {
    this.bar = num;
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
