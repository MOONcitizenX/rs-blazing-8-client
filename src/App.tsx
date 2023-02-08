import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { StartPage } from './components/startPage/StartPage';
import { useRoomState } from './store/roomStore';
import style from './App.module.css';

export const App = () => {
  const status = useRoomState((state) => state.status);

  return <div className={style.body}>{!status ? <StartPage /> : <LobbyPage />}</div>;
};
