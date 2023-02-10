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
import { backgroundsArray } from './store/basicMedia';
import { MusicPlayer } from './utils/MusicPlayer';
import { GamePage } from './components/gamePage/GamePage';

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

  const mainView = (status: string) => {
    if (!status) {
      return <StartPage socket={socket} />;
    }
    if (status === 'lobby') {
      return <LobbyPage socket={socket} />;
    }
    return <GamePage />;
  };

  const background = usePlayerState((state) => state.background);
  const status = useRoomState((state) => state.status);

  return (
    <div
      className={
        background === backgroundsArray[0] ? style.firstBackground : style.secondBackground
      }
    >
      <Menu />
      {mainView(status)}
    </div>
  );
};
