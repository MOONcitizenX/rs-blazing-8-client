import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import style from './StartPage.module.css';
import { IPlayerData } from '../../types/interfaces/IPlayerData';
import { UserRegistration } from '../startPageComponents/userRegistrationComponent/UserRegistration';
import { UserConnect } from '../startPageComponents/userConnectComponent/UserConnect';
import { AvatarChooseComponent } from '../startPageComponents/userAvatarChooseComponent/userAvatarChooseComponent';
import { ServerToClientEvents } from '../../API/ServerToClientEvents';

export const StartPage = () => {
  const navigate = useNavigate();
  const socket: Socket<ServerToClientEvents> = io('localhost:5555');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userData, setUserData] = useState<IPlayerData>({
    name: '',
    avatarId: 0,
    ready: true,
    roomId: '',
  });
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [socket]);

  const createRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isConnected) {
      socket.emit('create-room', { userName: userData.name });
      socket.on('room-state', (data) =>
        setUserData((prevState) => {
          return { ...prevState, roomId: data.roomId };
        }),
      );
      navigate('/lobby');
    }
  };

  const joinRoomHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isConnected) {
      if (userData.name === '') {
        setUserData((prevState) => {
          return { ...prevState, name: `palyer# ${Math.ceil(Math.random() * 100)}` };
        });
      }
      socket.emit('join-room', { roomId: userData.roomId, userName: userData.name });
      navigate('/lobby');
    }
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
          <div className={style.separator}>OR</div>
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
