import { Injectable } from '@angular/core';

enum Sounds {
  login = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Good_Old_Neon/This_Is_the_News/Good_Old_Neon_-_10_-_Video_Game_Soundtrack.mp3",
  battle = "https://freesound.org/data/previews/466/466998_285997-lq.mp3",
  profile = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Komiku_-_04_-_Skate.mp3",
  home = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Komiku/Captain_Glouglous_Incredible_Week_Soundtrack/Komiku_-_02_-_Home.mp3",
  flee = "https://freesound.org/people/pfranzen/sounds/383073/download/383073__pfranzen__running-away-on-solid-floor.ogg",
  eat = "https://freesound.org/people/yottasounds/sounds/232133/download/232133__yottasounds__crunchy-bite-001.wav",
};

@Injectable({
  providedIn: 'root'
})
export class SoundsService {
  music: HTMLAudioElement;

  constructor(){ 
    this.music = new Audio();
  }

  list() {
    return Sounds;
  }

  playLoop(sound:Sounds) {
    this.music.load();
    this.music.src = sound;
    this.music.play();
    this.music.loop = true;
  }

  playOnce(sound:Sounds) {
    let quick: HTMLAudioElement;
    quick = new Audio();
    quick.src = sound;
    quick.play();
    quick.loop = false;
  }

  stop() {
    this.music.pause();
  }
}
