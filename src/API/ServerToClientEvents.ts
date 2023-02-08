import { IRoomResponse } from './IRoomResponse';
import { IUserCreateRoom } from './IUserCreateRoom';
import { IJoinRoom } from './IJoinRoom';

export interface ServerToClientEvents {
  noArg: () => void;
  'create-room': (data: IUserCreateRoom) => void;
  'room-state': (data: IRoomResponse) => void;
  'join-room': (data: IJoinRoom) => void;
}
