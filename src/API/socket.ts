import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ServerToClientEvents } from './types/interfaces/ServerToClientEvents';
import { ClientToServerEvents } from './types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../store/playerStore';
import { useRoomState } from '../store/roomStore';
import { cardMap } from '../utils/cardsMap';

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
  // TODO Save all state?
  socket.on('room-state', (data) => {
    useRoomState.setState({ players: data.players });
    useRoomState.setState({ direction: data.direction });
    useRoomState.setState({ playerTurn: data.playerTurn });
    useRoomState.setState({ closedDeck: data.closedDeck });
    useRoomState.setState({ roomId: data.roomId });
    useRoomState.setState({ status: data.status });
    useRoomState.setState({ winner: data.winner });
    useRoomState.setState({ topCard: data.topCard ? cardMap[data.topCard] : null });
  });

  socket.on('error', (data) => {
    // todo notification with error
    alert(data?.message);
  });

  return socket;
};
