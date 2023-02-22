import { IRoomResponse } from './IRoomResponse';
import { IGetMeResponse } from './IGetMeResponse';
import { IErrorMessage } from './IErrorMessage';
import { ChatSMessage } from '../../../store/types/types/ChatMessage';
import { IWinnerResponse } from './IWinnerResponse';
import { ISwapCardsResponce } from './ISwapCardsResponce';
import { ITimerOutResponce, ITimerUpdateResponce } from './ITimerResponse';

export interface ServerToClientEvents {
  noArg: () => void;
  'room-state': (data: IRoomResponse) => void;
  'get-me': (data: IGetMeResponse) => void;
  'leave-success': () => void;
  'get-chat': (messages: ChatSMessage[]) => void;
  error: (message: IErrorMessage) => void;
  'choose-color': (value: boolean) => void;
  'winner-winner': (value: IWinnerResponse) => void;
  'one-card-left': (value: boolean) => void;
  'swap-cards': (value: ISwapCardsResponce) => void;
  'timer-update': (value: ITimerUpdateResponce) => void;
  'timer-out': (value: ITimerOutResponce) => void;
}
