import { IUserCreateRoom } from './IUserCreateRoom';
import { IJoinRoom } from './IJoinRoom';

export interface ClientToServerEvents {
  'join-room': (data: IJoinRoom) => void;
  'create-room': (data: IUserCreateRoom) => void;
  'leave-room': () => void;
  'start-game': () => void;
  'add-chat-message': ({ message }: { message: string }) => void;
}
