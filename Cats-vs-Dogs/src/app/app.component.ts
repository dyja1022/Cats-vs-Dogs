import { Component } from '@angular/core';
import { SwitchPageService } from './services/switch-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cats-vs-Dogs';
  //page = "init";
  //page = "traverse";
  constructor(public switchpage:SwitchPageService){}

  ngOnInit(){

  }

  setBackground()
  {
    document.getElementById("");
  }
}
