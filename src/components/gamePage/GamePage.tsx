import { avatarsArray } from '../../store/basicMedia';
import { useRoomState } from '../../store/roomStore';
import { Players } from '../basicComponents/playersWidget';
import style from './GamePage.module.css';

export const GamePage = () => {
  const players = useRoomState((state) => state.players);

  return (
    <div className={style.startPageWrapper}>
      <Players />
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          <div className={style.players}>
            {players.map((el, index) => {
              if (index !== 0) {
                return (
                  <div key={el.id} className={style.player}>
                    <img
                      className={style.avatar}
                      src={avatarsArray[+el.avatarId]}
                      alt="Player avatar"
                    />
                    <div className={style.hint}>{el.name}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
