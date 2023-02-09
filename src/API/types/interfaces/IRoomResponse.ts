import { IPlayerResponse } from './IPlayerResponse';
import { ICard } from '../../../store/types/interfaces/ICard';

export interface IRoomResponse {
  players: IPlayerResponse[];
  roomId: string;
  status: string;
  winner: string;
  closedDeck: ICard[];
}
