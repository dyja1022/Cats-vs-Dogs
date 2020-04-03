import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundsService {

  readonly login = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Good_Old_Neon/This_Is_the_News/Good_Old_Neon_-_10_-_Video_Game_Soundtrack.mp3";
  readonly battle = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Yung_Kartz/July_2019/Yung_Kartz_-_01_-_Rollie.mp3"
  readonly profile = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Komiku_-_04_-_Skate.mp3"
  readonly home = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Komiku_-_02_-_Home.mp3"
  soundArr:string[] = [];
  music: HTMLAudioElement;



  
  constructor() { 
    this.music = new Audio();
    this.soundArr.push(this.login)
    this.soundArr.push(this.battle)
    this.soundArr.push(this.profile)
    this.soundArr.push(this.home)
  }

  playLoop(n:number) {
    this.music.load();
    this.music.src = this.soundArr[n];
    this.music.play();
    this.music.loop = true;
  }

  playOnce(n:number) {
    let quick: HTMLAudioElement;
    quick = new Audio();
    quick.src = this.soundArr[n];
    quick.play();
    quick.loop = false;
  }

  stop() {
    this.music.pause();
  }
}
