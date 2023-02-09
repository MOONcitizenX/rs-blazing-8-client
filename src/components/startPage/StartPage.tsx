import React, { useState } from 'react';
import style from './StartPage.module.css';
import { IPlayerData } from '../../types/interfaces/IPlayerData';
import { UserRegistration } from '../startPageComponents/userRegistrationComponent/UserRegistration';
import { UserConnect } from '../startPageComponents/userConnectComponent/UserConnect';
import { AvatarChooseComponent } from '../startPageComponents/userAvatarChooseComponent/userAvatarChooseComponent';
import { Separator } from '../basicComponents/separator';
import { usePlayerState } from '../../store/playerStore';
import { useRoomState } from '../../store/roomStore';

export const StartPage = () => {
  const addName = usePlayerState((state) => state.addName);
  const changeStatus = useRoomState((state) => state.changeStatus);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userData, setUserData] = useState<IPlayerData>({
    name: '',
    avatarId: 0,
    ready: true,
    roomId: '',
  });

  const createRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addName(userData.name);
    changeStatus('lobby');
  };

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeStatus('lobby');
  };

  const changeAvatarHandler = (id: number) => {
    setUserData((prevState) => {
      return { ...prevState, avatarId: id };
    });
  };

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };

  const roomIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => {
      return { ...prevState, roomId: e.target.value.trim() };
    });
  };

  return (
    <div className={style.startPageWrapper}>
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          <AvatarChooseComponent onAvatarChange={changeAvatarHandler} />
          <UserRegistration
            userName={userData.name}
            userNameHandler={userNameHandler}
            onSubmit={createRoomHandler}
          />
          <Separator />
          <UserConnect
            roomId={userData.roomId}
            roomIdHandler={roomIdHandler}
            onSubmit={joinRoomHandler}
          />
        </div>
      </div>
    </div>
  );
};
