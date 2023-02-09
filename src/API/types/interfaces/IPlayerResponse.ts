import { ICard } from '../../../store/types/interfaces/ICard';

export interface IPlayerResponse {
  id: string;
  name: string;
  online: boolean;
  cards: ICard[];
}
