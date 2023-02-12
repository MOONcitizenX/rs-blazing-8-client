import { IPlayerResponse } from '../../../API/types/interfaces/IPlayerResponse';
import { ICard } from './ICard';

export interface RoomStoreTypes {
  closedDeck: number;
  topCard: ICard | null;
  roomId: string;
  status: 'lobby' | 'playing' | null;
  direction: 'CW' | 'ACW';
  playerTurn: string;
  winner: string | null;
  players: IPlayerResponse[];
}
