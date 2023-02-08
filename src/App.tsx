import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { StartPage } from './components/startPage/StartPage';
import style from './app.module.css';

export const App = () => {
  return (
    <div className={style.body}>
      <StartPage />
      <LobbyPage />
    </div>
  );
};
