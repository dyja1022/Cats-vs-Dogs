import { Component } from '@angular/core';
import { SwitchPageService } from './services/switch-page.service';
import { SoundsService } from './services/sounds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cats-vs-Dogs';
  isMute = false;
  //page = "init";
  //page = "traverse";
  constructor(public switchpage:SwitchPageService, public sounds:SoundsService){}

  ngOnInit(){

  }

  mute() {
    this.sounds.mute();
    this.isMute = true;
  }

  unmute() {
    this.sounds.unmute();
    this.isMute = false;
  }

  setBackground()
  {
    document.getElementById("");
  }
}
