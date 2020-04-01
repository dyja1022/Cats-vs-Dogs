import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageSessionService {

  constructor() { }

  //set health
  setHealth(someValue){
    sessionStorage.setItem("health",someValue);
  }

  //get hunger
  getHealth(){
    return sessionStorage.getItem("health");
  }

  //set hunger
  setHunger(someValue)
  {
    sessionStorage.setItem("hunger",someValue);
  }

  //get hunger
  getHunger()
  {
    return sessionStorage.getItem("hunger");
  }

  setExperience(someValue){
    sessionStorage.setItem("exp",someValue);
  }

  getExperience(){
    return sessionStorage.getItem("exp");
  }

  //add a method for keeping user signed in by saving to session storage
  //you'll need a service for authentication, meaning it needs an api backend

}
