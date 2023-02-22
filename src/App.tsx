import { Socket } from 'socket.io-client';
import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { StartPage } from './components/startPage/StartPage';
import { useRoomState } from './store/roomStore';
import style from './app.module.css';

import { Menu } from './components/menuComponent/Menu';
import { usePlayerState } from './store/playerStore';
import { backgroundsArray } from './store/basicMedia';
import { MusicPlayer } from './utils/MusicPlayer';
import { GamePage } from './components/gamePage/GamePage';
import { Chat } from './components/chat/Chat';
import { GameWinnerComponent } from './components/gameWinnerComponent/GameWinnerComponent';
import { OneCardAlert } from './components/oneCardAlert/OneCardAlert';
import { NotificationPopUp } from './components/notificationPopUp/NotificationPopUp';
import { SoundPlayer } from './utils/SoundPlayer';

const musicPlayer = MusicPlayer.getInstance();
const audioPlayer = SoundPlayer.getInstance();

interface AppProps {
  socket: Socket;
}
export const App = ({ socket }: AppProps) => {
  const musicVolume = usePlayerState((state) => state.musicVolume);
  const audioVolume = usePlayerState((state) => state.soundVolume);
  musicPlayer.volume = musicVolume;
  audioPlayer.volume = audioVolume;

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
  const winner = useRoomState((state) => state.winner);

  return (
    <div
      className={
        background === backgroundsArray[0] ? style.firstBackground : style.secondBackground
      }
    >
      {winner && <GameWinnerComponent socket={socket} />}
      <Menu />
      <NotificationPopUp />
      {mainView(status)}
      <Chat socket={socket} />
      <OneCardAlert />
    </div>
  );
};
