import { IUserCreateRoom } from './IUserCreateRoom';
import { IJoinRoom } from './IJoinRoom';

interface ICardSend {
  card: string;
}
export interface ClientToServerEvents {
  'join-room': (data: IJoinRoom) => void;
  'create-room': (data: IUserCreateRoom) => void;
  'leave-room': () => void;
  'start-game': () => void;
  'pass-turn': () => void;
  'draw-card': () => void;
  'play-card': (card: ICardSend) => void;
  'choose-color': () => void;
  'add-chat-message': ({ message }: { message: string }) => void;
  'convert-to-lobby': () => void;
}
