import { IPlayerResponse } from './IPlayerResponse';
// import { ICard } from '../../../store/types/interfaces/ICard';
import { TurnDirection } from '../../../store/types/types/TurnDirection';
import { RoomStateStatus } from '../../../store/types/types/RoomStateStatus';

export interface IRoomResponse {
  players: IPlayerResponse[];
  topCard: string | null;
  roomId: string;
  status: RoomStateStatus;
  winner: string;
  direction: TurnDirection;
  playerTurn: string;
  closedDeck: number;
}
