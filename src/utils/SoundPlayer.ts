import clickSound from '../assets/sounds/SE sounds/click.mp3';
import errorSound from '../assets/sounds/SE sounds/error.mp3';
import shuffleSound from '../assets/sounds/SE sounds/cardShuffle.mp3';
import playCardSound from '../assets/sounds/SE sounds/cardPlay.mp3';
import winSound from '../assets/sounds/SE sounds/winGame.mp3';
import chatSound from '../assets/sounds/SE sounds/chatNotification.mp3';

type SoundEvents = 'click' | 'error' | 'shuffle' | 'playCard' | 'win' | 'notification';
interface ISoundEvents {
  click: string;
  error: string;
  shuffle: string;
  playCard: string;
  win: string;
  notification: string;
}
const soundEvents: ISoundEvents = {
  click: clickSound,
  error: errorSound,
  shuffle: shuffleSound,
  playCard: playCardSound,
  win: winSound,
  notification: chatSound,
};

export class SoundPlayer {
  private static instance: SoundPlayer;

  player: HTMLAudioElement;

  events = soundEvents;

  constructor() {
    this.player = new Audio();
  }

  public static getInstance(): SoundPlayer {
    if (!SoundPlayer.instance) {
      SoundPlayer.instance = new SoundPlayer();
    }

    return SoundPlayer.instance;
  }

  play(option: SoundEvents) {
    this.player.src = this.events[option];
    this.player.play();
  }

  set volume(value: number) {
    this.player.volume = value;
  }
}
