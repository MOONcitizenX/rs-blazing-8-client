import { ICard } from '../../../store/types/interfaces/ICard';

export interface IPlayerResponse {
  avatarId: string;
  id: string;
  name: string;
  online: boolean;
  cards: ICard[];
}
