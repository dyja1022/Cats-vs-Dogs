import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchPageService {

  constructor() { }

  page = "pet";

  changePage(page:string)
  {
    this.page = page;
  }
}
