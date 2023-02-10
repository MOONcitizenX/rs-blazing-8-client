import style from './playersWidget.module.css';
import eyeIcon from '../../assets/icons/eye.svg';
import { useRoomState } from '../../store/roomStore';
import { avatarsArray } from '../../store/basicMedia';

export const Players = (/* accepts players data */) => {
  const players = useRoomState((state) => state.players);

  return (
    <div className={style.playersWrapper}>
      <div className={style.players}>
        <button
          className={style.removeButton}
          type="button"
          onClick={() => {
            /* TODO move player to spectators */
          }}
        >
          <p className={style.buttonText}>-</p>
        </button>
        <div className={style.hint}>Select to not play</div>

        {players.map((el) => {
          return (
            <div key={el.id} className={style.player}>
              <img className={style.avatar} src={avatarsArray[+el.avatarId]} alt="Players avatar" />
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
