import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  apiUrl: string = "https://api.thecatapi.com/v1/images/search";

  constructor(private client: HttpClient) { }

  getRandomImage() {
    return this.client.get(this.apiUrl);
  }
  
}
