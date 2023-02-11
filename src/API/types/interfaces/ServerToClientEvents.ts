import { IRoomResponse } from './IRoomResponse';
import { IGetMeResponse } from './IGetMeResponse';

export interface ServerToClientEvents {
  noArg: () => void;
  'room-state': (data: IRoomResponse) => void;
  'get-me': (data: IGetMeResponse) => void;
  'leave-success': () => void;
  error: (message: string) => void;
}
