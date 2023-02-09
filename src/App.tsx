import { Socket } from 'socket.io-client';
import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { StartPage } from './components/startPage/StartPage';
import { useRoomState } from './store/roomStore';
import style from './App.module.css';
import { ServerToClientEvents } from './API/ServerToClientEvents';
import { ClientToServerEvents } from './API/types/interfaces/ClientToServerEvents';

interface AppProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}
export const App = ({ socket }: AppProps) => {
  const status = useRoomState((state) => state.status);
  return (
    <div className={style.body}>
      {!status ? <StartPage socket={socket} /> : <LobbyPage socket={socket} />}
    </div>
  );
};
