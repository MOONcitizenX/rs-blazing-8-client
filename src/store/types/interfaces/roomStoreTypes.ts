import { IPlayerResponse } from '../../../API/types/interfaces/IPlayerResponse';
import { ICard } from './ICard';

export interface RoomStoreTypes {
  players: IPlayerResponse[];
  roomId: string;
  status: string;
  winner: string;
  closedDeck: ICard[];
}
