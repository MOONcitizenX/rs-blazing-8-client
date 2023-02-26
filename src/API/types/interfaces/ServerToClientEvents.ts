import { IRoomResponse } from './IRoomResponse';
import { IGetMeResponse } from './IGetMeResponse';
import { IErrorMessage } from './IErrorMessage';
import { ChatSMessage } from '../../../store/types/types/ChatMessage';
import { IWinnerResponse } from './IWinnerResponse';
import { ISwapCardsResponse } from './ISwapCardsResponse';
import { ITimerUpdateResponse } from './ITimerResponse';
import { IPlayedCardPlayer } from './IPlayedCardPlayer';
import { IEmojiResponse } from './IEmojiResponse';
import { ICardDrawResponse } from './ICardDrawResponse';

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
  'swap-cards': (value: ISwapCardsResponse) => void;
  'timer-update': (value: ITimerUpdateResponse) => void;
  'player-played-card': (value: IPlayedCardPlayer) => void;
  'card-draw': (value: ICardDrawResponse) => void;
  emoji: (value: IEmojiResponse) => void;
}
