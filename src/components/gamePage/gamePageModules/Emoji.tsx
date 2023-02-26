import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { ServerToClientEvents } from '../../../API/types/interfaces/ServerToClientEvents';
import { emojiArray } from '../../../store/basicMedia';
import style from './Emoji.module.css';

interface EmojiComponentProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export const EmojiComponent = ({ socket }: EmojiComponentProps) => {
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState<number | null>(null);

  const sendEmoji = (index: number) => {
    socket.emit('emoji', { emojiIndex: index });
  };

  const changeEmojiMenuButton = (index: number) => {
    setEmojiIndex(index);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmojiIndex(null);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [emojiIndex]);

  return (
    <div className={style.emojiWrapper}>
      <button
        type="button"
        className={style.emojiMenu}
        onClick={() => setIsEmojiMenuOpen(!isEmojiMenuOpen)}
      >
        <img
          className={classNames(style.menuImage, {
            [style.menuImageActive]: emojiIndex !== null,
          })}
          src={emojiIndex !== null ? emojiArray[emojiIndex].gif : emojiArray[0].svg}
          alt={emojiArray[0].alt}
        />
      </button>

      <div
        className={classNames(style.emojiArray, {
          [style.emojiArrayOpen]: isEmojiMenuOpen,
        })}
        style={isEmojiMenuOpen ? { opacity: '1' } : { opacity: '0' }}
      >
        {emojiArray.map((el, index) => {
          return (
            <button
              className={classNames(style.emoji, {
                [style.shownEmoji]: isEmojiMenuOpen,
              })}
              type="button"
              key={el.alt}
              onClick={() => {
                sendEmoji(index);
                changeEmojiMenuButton(index);
                setIsEmojiMenuOpen(false);
              }}
            >
              <img className={style.menuImage} src={el.image} alt={el.alt} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
