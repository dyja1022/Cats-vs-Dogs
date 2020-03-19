import { Component, OnInit } from '@angular/core';
import { DogService } from '../services/dog.service';
import { CatService } from '../services/cat.service';

interface DogData {
  message: string;
  status: string;
}


interface CatData {
  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dog: DogData;
  dogUrl: string;

  cat: CatData;
  catUrl: string;

  constructor(dogService: DogService, catService: CatService) { 

    dogService.getRandomImage().subscribe(res => {
      this.dog = res as DogData;
      this.dogUrl = this.dog.message;
    })

    catService.getRandomImage().subscribe(res => {
      this.cat = res as CatData;
      this.catUrl = this.cat[0]['url'];
      console.log(this.catUrl)
    })


  }

  ngOnInit(): void {
    
  }

}
