import { IPlayerResponse } from '../API/IPlayerResponse';

export interface RoomStoreTypes {
  players: IPlayerResponse[];
  roomId: string;
  userId: string | null;
  status: string | null;
}
