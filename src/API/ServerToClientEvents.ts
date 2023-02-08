import { IRoomResponse } from './IRoomResponse';
import { IUserCreateRoom } from './IUserCreateRoom';
import { IJoinRoom } from './IJoinRoom';
import { IGetMeResponse } from './IGetMeResponse';

export interface ServerToClientEvents {
  noArg: () => void;
  'create-room': (data: IUserCreateRoom) => void;
  'room-state': (data: IRoomResponse) => void;
  'join-room': (data: IJoinRoom) => void;
  'get-me': (data: IGetMeResponse) => void;
}
