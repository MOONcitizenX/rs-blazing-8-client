import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ServerToClientEvents } from './ServerToClientEvents';

export const createSocket = (updateUserId: (id: string) => void) => {
  const socket: Socket<ServerToClientEvents> = io('ws://localhost:5555', {
    transports: ['websocket'],
    auth: {
      token: localStorage.token ?? (localStorage.token = uuidv4()),
    },
  });
  socket.on('get-me', (message) => {
    updateUserId(message.id);
  });
};
