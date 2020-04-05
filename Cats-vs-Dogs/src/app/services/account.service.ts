import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  async login(username:string, password:string) {
    const resp = await this.client.get(this.baseUrl + `/user/login?Username=${username}&Password=${password}`).toPromise();
    return resp;
  }

  async getStats(userId: number) {
    const resp = await this.client.get(this.baseUrl + `/User/stats/${userId}`).toPromise();
    return resp;
  }

  

}
