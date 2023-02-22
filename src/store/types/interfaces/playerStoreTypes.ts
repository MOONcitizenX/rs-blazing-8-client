import { CardSort } from '../types/CardSort';

export interface PlayerStoreTypes {
  name: string;
  avatarId: string;
  host: boolean;
  sound: boolean;
  music: boolean;
  avatarImg: string;
  background: string;
  cardback: string;
  cardsSort: CardSort;
  musicVolume: number;
  soundVolume: number;
  emotion?: unknown;
  setId: (id: string) => void;
  changeAvatarId: (avatarId: string) => void;
  addName: (name: string) => void;
  changeBackground: (background: string) => void;
  changeCardback: (cardback: string) => void;
  changeMusicValue: (value: boolean) => void;
  changeSoundValue: (value: boolean) => void;
  changeMusicVolume: (value: number) => void;
  changeSoundVolume: (value: number) => void;
  changeAvatarImg: (img: string) => void;
  changeCardsSort: (value: CardSort) => void;
}
