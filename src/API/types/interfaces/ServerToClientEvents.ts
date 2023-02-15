import { IRoomResponse } from './IRoomResponse';
import { IGetMeResponse } from './IGetMeResponse';
import { ChatSMessage } from '../../../store/types/types/chatMessage';

export interface ServerToClientEvents {
  noArg: () => void;
  'room-state': (data: IRoomResponse) => void;
  'get-me': (data: IGetMeResponse) => void;
  'leave-success': () => void;
  'get-chat': (messages: ChatSMessage[]) => void;
  error: (message: string) => void;
  'choose-color': (value: boolean) => void;
}
