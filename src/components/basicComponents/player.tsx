import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { avatarsArray, emojiArray } from '../../store/basicMedia';
import style from './player.module.css';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';

interface PlayerProps {
  socket: Socket<ServerToClientEvents>;
  player: IPlayerResponse;
}

export const Player = ({ socket, player }: PlayerProps) => {
  const { avatarId, name } = player;

  const [emojiInd, setEmojiInd] = useState<number | null>(null);

  socket.on('emoji', ({ id, emojiIndex }) => {
    if (id === player.id) {
      setEmojiInd(emojiIndex);
    }
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmojiInd(null);
    }, 30000);
    return () => clearTimeout(timeout);
  }, [emojiInd]);

  return (
    <div className={style.playerWrapper}>
      <div className={style.player}>
        <img className={style.avatar} src={avatarsArray[+avatarId]} alt="Player avatar" />
        <div className={style.name}>{name}</div>
        {emojiInd !== null && (
          <div className={style.emoji}>
            <picture>
              <source srcSet={emojiArray[emojiInd].image} type="image/webp" />
              <img
                className={style.emojiImage}
                src={emojiArray[emojiInd].gif}
                alt={emojiArray[emojiInd].alt}
              />
            </picture>
          </div>
        )}
      </div>
    </div>
  );
};
