import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cats-vs-Dogs';
  //page = "init";
  page = "traverse";


  changePage(page:string)
  {
    this.page = page;
  }

  setBackground()
  {
    document.getElementById("");
  }
}
