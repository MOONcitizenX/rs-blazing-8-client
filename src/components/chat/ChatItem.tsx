import classNames from 'classnames';
import { MutableRefObject } from 'react';
import { useRoomState } from '../../store/roomStore';
import styles from './ChatItem.module.css';

interface ChatItemProps {
  author: string;
  timeStamp: string;
  message: string;
  scrollRef?: MutableRefObject<HTMLDivElement> | undefined;
}

export const ChatItem = ({ author, timeStamp, message, scrollRef }: ChatItemProps) => {
  const clientId = useRoomState((state) => state.id);
  const isClientMessage = clientId === author;
  const players = useRoomState((state) => state.players).map((player) => ({
    id: player.id,
    name: player.name,
  }));
  const authorName = players.find((player) => player.id === author)?.name;
  const colors = ['#4385c3', '#39ab89', '#f15743', '#f69c3e'];
  const playerIndex = players.findIndex((player) => player.id === author);

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
        <span
          className={styles.authorName}
          style={
            !isClientMessage
              ? { color: colors[playerIndex < colors.length - 1 ? playerIndex - 1 : playerIndex] }
              : { color: 'white' }
          }
        >
          {authorName}
        </span>
        <span
          className={classNames(styles.timeStamp, {
            [styles.myTime]: isClientMessage,
          })}
        >
          at {timeStamp}
        </span>
      </div>
      <div
        className={classNames(styles.message, {
          [styles.myMessage]: isClientMessage,
        })}
      >
        {message}
      </div>
    </div>
  );
};
