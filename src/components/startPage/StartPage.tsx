import { useState } from 'react';
import { Socket } from 'socket.io-client';
import style from './StartPage.module.css';
import { UserRegistration } from '../startPageComponents/userRegistrationComponent/UserRegistration';
import { UserConnect } from '../startPageComponents/userConnectComponent/UserConnect';
import { AvatarChooseComponent } from '../startPageComponents/userAvatarChooseComponent/userAvatarChooseComponent';
import { Separator } from '../basicComponents/separator';
import { usePlayerState } from '../../store/playerStore';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';
import { TableArrows } from '../basicComponents/tableArrows';
import { Footer } from '../footer/Footer';

interface StartPageProps {
  socket: Socket<ClientToServerEvents>;
}

export const StartPage = ({ socket }: StartPageProps) => {
  const addName = usePlayerState((state) => state.addName);
  const [userName, setUserName] = useState<string>(usePlayerState((state) => state.name) || '');
  const [roomId, setRoomId] = useState<string>('');

  const avatarId = usePlayerState((state) => state.avatarId);

  const createRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addName(userName);
    socket.emit('create-room', { userName, avatarId });
  };

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('join-room', { userName, roomId, avatarId });
  };

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value.trim());
  };

  return (
    <div className={style.startPageWrapper}>
      <div className={style.tableWrapper}>
        <TableArrows />
        <div className={style.startTable}>
          <AvatarChooseComponent />
          <UserRegistration
            userName={userName}
            userNameHandler={userNameHandler}
            onSubmit={createRoomHandler}
          />
          <Separator />
          <UserConnect
            isUserName={!userName}
            roomId={roomId}
            roomIdHandler={roomIdHandler}
            onSubmit={joinRoomHandler}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
