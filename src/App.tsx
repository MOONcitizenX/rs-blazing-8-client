import { Socket } from 'socket.io-client';
import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { StartPage } from './components/startPage/StartPage';
import { useRoomState } from './store/roomStore';
import style from './App.module.css';

import { Menu } from './components/menuComponent/Menu';
import { usePlayerState } from './store/playerStore';
import { backgroundsArray } from './store/basicMedia';
import { MusicPlayer } from './utils/MusicPlayer';
import { GamePage } from './components/gamePage/GamePage';
import { Chat } from './components/chat/Chat';
import { GameWinnerComponent } from './components/gameWinnerComponent/GameWinnerComponent';
import { OneCardAlert } from './components/oneCardAlert/OneCardAlert';

const musicPlayer = new MusicPlayer();

interface AppProps {
  socket: Socket;
}
export const App = ({ socket }: AppProps) => {
  const musicValue = usePlayerState((state) => state.music);
  if (musicValue) {
    musicPlayer.play();
  } else {
    musicPlayer.pause();
  }

  const mainView = (status: string | null) => {
    if (status === 'playing') {
      return <GamePage socket={socket} />;
    }
    if (status === 'lobby') {
      return <LobbyPage socket={socket} />;
    }
    return <StartPage socket={socket} />;
  };

  const background = usePlayerState((state) => state.background);
  const status = useRoomState((state) => state.status);

  return (
    <div
      className={
        background === backgroundsArray[0] ? style.firstBackground : style.secondBackground
      }
    >
      <GameWinnerComponent socket={socket} />
      <Menu />
      {mainView(status)}
      <Chat socket={socket} />
      <OneCardAlert />
    </div>
  );
};
