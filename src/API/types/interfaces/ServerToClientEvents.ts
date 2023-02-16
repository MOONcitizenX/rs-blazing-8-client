import { IRoomResponse } from './IRoomResponse';
import { IGetMeResponse } from './IGetMeResponse';
import { IErrorMessage } from './IErrorMessage';
import { ChatSMessage } from '../../../store/types/types/ChatMessage';
import { IWinnerResponse } from './IWinnerResponse';

export interface ServerToClientEvents {
  noArg: () => void;
  'room-state': (data: IRoomResponse) => void;
  'get-me': (data: IGetMeResponse) => void;
  'leave-success': () => void;
  'get-chat': (messages: ChatSMessage[]) => void;
  error: (message: IErrorMessage) => void;
  'choose-color': (value: boolean) => void;
  'winner-winner': (value: IWinnerResponse) => void;
}
