import { IPlayerResponse } from '../../../API/types/interfaces/IPlayerResponse';
import { TurnDirection } from '../types/TurnDirection';
import { ICard } from './ICard';
import { RoomStateStatus } from '../types/RoomStateStatus';
import { ISwapCardsResponce } from '../../../API/types/interfaces/ISwapCardsResponce';

export interface RoomStoreTypes {
  closedDeck: number;
  topCard: ICard | null;
  roomId: string;
  status: RoomStateStatus;
  direction: TurnDirection;
  playerTurn: string;
  winner: string | null;
  players: IPlayerResponse[];
  isCardSuitChoose: boolean;
  id: string;
  oneCardLeft: boolean;
  error: string;
  changeDirection: (direction: TurnDirection) => void;
  setIsCardSuitChoose: (isCardSuitChoose: boolean) => void;
  setStatus: (status: RoomStateStatus) => void;
  setWinner: (winner: string | null) => void;
  setError: (text: string) => void;
  setNewCards: ({
    playerId,
    nextPlayerId,
    playerCards,
    nextPlayerCards,
  }: ISwapCardsResponce) => void;
}
