import React, { useState } from 'react';
import style from './StartPage.module.css';
import { IPlayerData } from '../../types/interfaces/IPlayerData';
import { UserRegistration } from '../startPageComponents/userRegistrationComponent/UserRegistration';
import { UserConnect } from '../startPageComponents/userConnectComponent/UserConnect';
import { AvatarChooseComponent } from '../startPageComponents/userAvatarChooseComponent/userAvatarChooseComponent';

export const StartPage = () => {
  const [userData, setUserData] = useState<IPlayerData>({
    name: '',
    avatarId: 0,
    ready: true,
  });

  const createRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeAvatarHandler = (id: number) => {
    setUserData((prevState) => {
      return { ...prevState, avatarId: id };
    });
  };

  return (
    <div className={style.startPageWrapper}>
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          <AvatarChooseComponent onAvatarChange={changeAvatarHandler} />
          <UserRegistration onSubmit={createRoomHandler} />
          <div className={style.separator}>OR</div>
          <UserConnect onSubmit={joinRoomHandler} />
        </div>
      </div>
    </div>
  );
};
