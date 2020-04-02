import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Animal {

}

interface User {
  id : number;
  username : string;
  firstLogin : boolean;
  animal : Animal
}

@Injectable({
  providedIn: 'root'
})

/*
  Handles account login, register
*/
export class AccountService {

  baseUrl = "https://localhost:44363/api";

  //https://localhost:44363/api/user/login?Username=bananaman&Password=bananaman
  constructor(private client: HttpClient) { }

  login(username:string, password:string) : Observable<any> {
    return this.client.get(this.baseUrl + `/user/login?Username=${username}&Password=${password}`);
  }


}
