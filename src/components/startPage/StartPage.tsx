import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import style from './StartPage.module.css';
import { UserRegistration } from '../startPageComponents/userRegistrationComponent/UserRegistration';
import { UserConnect } from '../startPageComponents/userConnectComponent/UserConnect';
import { AvatarChooseComponent } from '../startPageComponents/userAvatarChooseComponent/userAvatarChooseComponent';
import { Separator } from '../basicComponents/separator';
import { usePlayerState } from '../../store/playerStore';
import { ServerToClientEvents } from '../../API/ServerToClientEvents';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';

interface StartPageProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export const StartPage = ({ socket }: StartPageProps) => {
  const addName = usePlayerState((state) => state.addName);
  const userId = usePlayerState((state) => state.id);
  const [userName, setUserName] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [avatarId, setAvatarId] = useState<string>('0');

  const createRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addName(userName);
    socket.emit('create-room', { userName });
  };

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('join-room', { userName, roomId, avatarId });
  };

  const changeAvatarHandler = (id: string) => {
    setAvatarId(id);
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
        <div className={style.startTable}>
          <AvatarChooseComponent onAvatarChange={changeAvatarHandler} />
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
    </div>
  );
};
