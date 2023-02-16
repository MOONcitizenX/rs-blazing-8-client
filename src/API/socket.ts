import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ServerToClientEvents } from './types/interfaces/ServerToClientEvents';
import { ClientToServerEvents } from './types/interfaces/ClientToServerEvents';
import { useRoomState } from '../store/roomStore';
import { cardMap } from '../utils/cardsMap';
import { useChatState } from '../store/chatStore';

export const createSocket = () => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('ws://localhost:5555', {
    transports: ['websocket'],
    auth: {
      token: localStorage.token ?? (localStorage.token = uuidv4()),
    },
  });

  socket.on('get-me', (data) => {
    useRoomState.setState({ id: data.id });
  });

  socket.on('room-state', (data) => {
    useRoomState.setState({ players: data.players });
    useRoomState.setState({ direction: data.direction });
    useRoomState.setState({ playerTurn: data.playerTurn });
    useRoomState.setState({ closedDeck: data.closedDeck });
    useRoomState.setState({ roomId: data.roomId });
    useRoomState.setState({ status: data.status });
    useRoomState.setState({ topCard: data.topCard ? cardMap[data.topCard] : null });
  });

  socket.on('get-chat', (messages) => {
    useChatState.setState({ messages });
  });

  socket.on('choose-color', (data) => {
    useRoomState.setState({ isCardSuitChoose: data });
  });

  socket.on('error', (data) => {
    // todo notification with error
    alert(data.message);
  });

  socket.on('winner-winner', (data) => {
    // todo notification with winner and clear room state after host
    alert(data.winner);
    useRoomState.setState({ winner: data.winner });
  });

  socket.on('one-card-left', (isOneCardLeft) => {
    useRoomState.setState({ oneCardLeft: isOneCardLeft });
  });

  return socket;
};
