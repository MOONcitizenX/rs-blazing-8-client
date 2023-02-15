import clickSound from '../assets/sounds/SE sounds/click.mp3';
import errorSound from '../assets/sounds/SE sounds/error.mp3';
import shuffleSound from '../assets/sounds/SE sounds/cardShuffle.mp3';
import playCardSound from '../assets/sounds/SE sounds/cardPlay.mp3';

type SoundEvents = 'click' | 'error' | 'shuffle' | 'playCard';
interface ISoundEvents {
  click: string;
  error: string;
  shuffle: string;
  playCard: string;
}
const soundEvents: ISoundEvents = {
  click: clickSound,
  error: errorSound,
  shuffle: shuffleSound,
  playCard: playCardSound,
};

export class SoundPlayer {
  instance: null | SoundPlayer = null;

  player = new Audio();

  isPlay: boolean;

  events = soundEvents;

  constructor() {
    this.isPlay = false;
  }

  play(option: SoundEvents) {
    if (!this.isPlay) {
      this.isPlay = true;
      this.player.src = this.events[option];
      this.player.play();
      this.player.onended = () => {
        this.isPlay = false;
      };
    }
  }
}
