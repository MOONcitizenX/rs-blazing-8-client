import classNames from 'classnames';
import { MutableRefObject } from 'react';
import { usePlayerState } from '../../store/playerStore';
import { useRoomState } from '../../store/roomStore';
import styles from './ChatItem.module.css';

interface ChatItemProps {
  author: string;
  timeStamp: string;
  message: string;
  scrollRef?: MutableRefObject<HTMLDivElement> | undefined;
}

export const ChatItem = ({ author, timeStamp, message, scrollRef }: ChatItemProps) => {
  const clientId = usePlayerState((state) => state.id);
  const isClientMessage = clientId === author;
  const players = useRoomState((state) => state.players).map((player) => ({
    id: player.id,
    name: player.name,
  }));
  const authorName = players.find((player) => player.id === author)?.name;

  return (
    <div
      ref={scrollRef}
      className={classNames(styles.messageBox, {
        [styles.myBox]: isClientMessage,
      })}
    >
      <div
        className={classNames(styles.author, {
          [styles.clientMessage]: isClientMessage,
        })}
      >
        <span>{authorName}</span>
        <span className={styles.timeStamp}>at {timeStamp}</span>
      </div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
