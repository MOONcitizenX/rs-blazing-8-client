import { SoundPlayer } from '../../../utils/SoundPlayer';

export interface PlayerStoreTypes {
  id: string;
  name: string;
  avatarId: string;
  host: boolean;
  sound: boolean;
  music: boolean;
  soundPlayer: SoundPlayer;
  background?: unknown;
  cardback?: unknown;
  emotion?: unknown;
  timer?: unknown;
  cardsInHand?: unknown;
  setId: (id: string) => void;
  changeAvatarId: (avatarId: string) => void;
  addName: (name: string) => void;
  changeBackground: (background: string) => void;
  changeCardback: (cardback: string) => void;
  changeMusicValue: (value: boolean) => void;
  changeSoundValue: (value: boolean) => void;
  changeAvatarImg: (img: string) => void;
}
