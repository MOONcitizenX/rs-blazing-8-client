import { IPlayerResponse } from './IPlayerResponse';

export interface IRoomResponse {
  players: IPlayerResponse[];
  roomId: string;
}
