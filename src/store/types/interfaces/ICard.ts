import { CardColor } from '../types/CardColor';

export interface ICard {
  value: string;
  color: CardColor;
  image: string;
  cardId: string;
  sortValue: number;
  sortSuit?: string;
}
