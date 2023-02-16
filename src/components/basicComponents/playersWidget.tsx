import { Socket } from 'socket.io-client';
import style from './playersWidget.module.css';
import eyeIcon from '../../assets/icons/eye.svg';
import { useRoomState } from '../../store/roomStore';
import { avatarsArray } from '../../store/basicMedia';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';

interface PlayersProps {
  socket: Socket<ClientToServerEvents>;
}
export const Players = ({ socket }: PlayersProps) => {
  const players = useRoomState((state) => state.players);
  const setStatus = useRoomState((state) => state.setStatus);

  const leaveRoomHandler = () => {
    socket.emit('leave-room');
    setStatus(null);
  };

  return (
    <div className={style.playersWrapper}>
      <div className={style.players}>
        <button className={style.removeButton} type="button" onClick={leaveRoomHandler}>
          <p className={style.buttonText}>-</p>
        </button>
        <div className={style.hint}>Select to not play</div>

        {players.map((el) => {
          return (
            <div key={el.id} className={style.player}>
              <img className={style.avatar} src={avatarsArray[+el.avatarId]} alt="Player avatar" />
              <div className={style.hint}>{el.name}</div>
            </div>
          );
        })}
      </div>
      <div className={style.spectators}>
        <div className={style.eye}>
          <img className={style.eyeImage} src={eyeIcon} alt="Eye" />
        </div>
      </div>
    </div>
  );
};
