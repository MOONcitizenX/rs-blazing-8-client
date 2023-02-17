import { animated, config, useSpring } from '@react-spring/web';
import { usePlayerState } from '../../store/playerStore';
import { avatarsArray } from '../../store/basicMedia';
import style from './player.module.css';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import { useRoomState } from '../../store/roomStore';

interface PlayerProps {
  player: IPlayerResponse;
  index: number;
}

export const Player = ({ player, index }: PlayerProps) => {
  const { cards, id, avatarId, name } = player;
  const cardback = usePlayerState((state) => state.cardback);
  /* const direction = useRoomState((state) => state.direction);

  const xProps = ['11rem', '58rem', '11rem', '-40rem'];
  const yProps = ['-31rem', '0', '31rem', '21rem'];

  const swapCW = useSpring({
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: `translate(${xProps[index - 1]}, ${yProps[index - 1]})`,
    },
    config: { duration: 1000, ...config.slow },
    OnRest: {
      transform: 'translate(0, 0)',
    },
  });

  const xACWProps = ['40rem', '-11rem', '-58rem', '-11rem'];
  const yACWProps = ['21rem', '31rem', '0', '-31rem'];

  const swapACW = useSpring({
    from: {
      transform: 'translate(0, 0)',
    },
    to: {
      transform: `translate(${xACWProps[index - 1]}, ${yACWProps[index - 1]})`,
    },
    config: { duration: 1000 },
    OnRest: {
      transform: 'translate(0, 0)',
    },
  }); */

  // style={direction === 'CW' ? swapCW : swapACW}
  // TODO onAnimationEnd = transform translate(0, 0)
  return (
    <div className={style.playerWrapper}>
      <animated.div className={style.playerCards}>
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
      </animated.div>
      <div className={style.player}>
        <img className={style.avatar} src={avatarsArray[+avatarId]} alt="Player avatar" />
        <div className={style.name}>{name}</div>
      </div>
    </div>
  );
};
