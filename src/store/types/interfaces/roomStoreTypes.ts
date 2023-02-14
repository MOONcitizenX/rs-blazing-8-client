import { IPlayerResponse } from '../../../API/types/interfaces/IPlayerResponse';
import { TurnDirection } from '../types/TurnDirection';
import { ICard } from './ICard';
import { RoomStateStatus } from '../types/RoomStateStatus';

export interface RoomStoreTypes {
  closedDeck: number;
  topCard: ICard | null;
  roomId: string;
  status: RoomStateStatus;
  direction: TurnDirection;
  playerTurn: string;
  winner: string | null;
  players: IPlayerResponse[];
  changeDirection: (direction: 'CW' | 'ACW') => void;
}
