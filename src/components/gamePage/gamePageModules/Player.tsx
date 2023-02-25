import { avatarsArray } from '../../../store/basicMedia';
import style from './Player.module.css';
import { IPlayerResponse } from '../../../API/types/interfaces/IPlayerResponse';

interface PlayerProps {
  player: IPlayerResponse;
}

export const Player = ({ player }: PlayerProps) => {
  const { avatarId, name } = player;

  return (
    <div className={style.playerWrapper}>
      <div className={style.player}>
        <img className={style.avatar} src={avatarsArray[+avatarId]} alt="Player avatar" />
        <div className={style.name}>{name}</div>
      </div>
    </div>
  );
};
