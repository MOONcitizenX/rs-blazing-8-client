import { Routes, Route } from 'react-router-dom';
import { LobbyPage } from './components/lobbyPage/LobbyPage';
import { NotFoundPage } from './components/notFoundPage/NotFoundPage';
import { StartPage } from './components/startPage/StartPage';

export const App = () => {
  return (
    <>
      <header />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
