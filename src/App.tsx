import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { StartPage } from './components/startPage/StartPage';
import { useRoomState } from './store/roomStore';
import style from './App.module.css';
import { ServerToClientEvents } from './API/types/interfaces/ServerToClientEvents';
import { ClientToServerEvents } from './API/types/interfaces/ClientToServerEvents';
import { Menu } from './components/menuComponent/Menu';
import { usePlayerState } from './store/playerStore';
import { MusicPlayer } from './utils/MusicPlayer';

const musicPlayer = new MusicPlayer();

interface AppProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}
export const App = ({ socket }: AppProps) => {
  const musicValue = usePlayerState((state) => state.music);

  useEffect(() => {
    if (musicValue) {
      musicPlayer.play();
    } else {
      musicPlayer.pause();
    }
  }, [musicValue]);

  const status = useRoomState((state) => state.status);
  return (
    <div className={style.body}>
      <Menu />
      {!status ? <StartPage socket={socket} /> : <LobbyPage socket={socket} />}
    </div>
  );
};
