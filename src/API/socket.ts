import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ServerToClientEvents } from './types/interfaces/ServerToClientEvents';
import { ClientToServerEvents } from './types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../store/playerStore';
import { useRoomState } from '../store/roomStore';

export const createSocket = () => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://localhost:5555', {
    transports: ['websocket'],
    auth: {
      token: localStorage.token ?? (localStorage.token = uuidv4()),
    },
  });

  socket.on('get-me', (data) => {
    usePlayerState.setState({ id: data.id });
  });

  socket.on('room-state', (data) => {
    useRoomState.setState({ players: data.players });
    useRoomState.setState({ closedDeck: data.closedDeck });
    useRoomState.setState({ roomId: data.roomId });
    useRoomState.setState({ status: data.status });
    useRoomState.setState({ winner: data.winner });
  });

  socket.on('error', (data) => {
    // todo notification with error
    alert(data.message);
  });

  return socket;
};
