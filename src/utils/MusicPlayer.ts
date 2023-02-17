import firstTrack from '../assets/sounds/music/01. The Quarantine Zone [20 Years Later].mp3';
import secondTrack from '../assets/sounds/music/1-01. Wake Up, Get Up, Get Out There.mp3';
import thirdTrack from '../assets/sounds/music/03. The Last of Us.mp3';

export class MusicPlayer {
  player = new Audio(firstTrack);

  index = 0;

  musicArr = [firstTrack, secondTrack, thirdTrack];

  constructor() {
    this.player.onended = () => this.nextTrack();
    this.player.volume = 0.7;
  }

  nextTrack() {
    this.index = this.index < this.musicArr.length - 1 ? this.index + 1 : 0;
    this.player.src = this.musicArr[this.index];
    this.player.play();
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }
}
