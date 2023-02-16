import { usePlayerState } from '../../store/playerStore';
import { avatarsArray } from '../../store/basicMedia';
import style from './player.module.css';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';

interface PlayerProps {
  player: IPlayerResponse;
}

export const Player = ({ player }: PlayerProps) => {
  const { cards, id, avatarId, name } = player;
  const cardback = usePlayerState((state) => state.cardback);

  return (
    <div className={style.playerWrapper}>
      <div className={style.playerCards}>
        {[...new Array(cards)].map((_, i) => {
          const count = +cards;
          const angle = 100;
          const offset = angle / 2;
          const increment = angle / (count + 1);

          return (
            <img
              key={`${id}-${i + 1}`}
              className={style.playerCard}
              style={{
                transform: `translate(-50%, -50%) rotate(${-offset + increment * (i + 1)}deg)`,
              }}
              src={cardback}
              alt="Card"
            />
          );
        })}
      </div>
      <div className={style.player}>
        <img className={style.avatar} src={avatarsArray[+avatarId]} alt="Player avatar" />
        <div className={style.name}>{name}</div>
      </div>
    </div>
  );
};
