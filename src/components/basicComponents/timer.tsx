import { useSpring, animated } from '@react-spring/web';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import { useRoomState } from '../../store/roomStore';
import style from './timer.module.css';

interface TimerProps {
  index: number;
  players: IPlayerResponse[];
  skipTurnHandler: () => void;
}

export const Timer = ({ index, players, skipTurnHandler }: TimerProps) => {
  const direction = useRoomState((state) => state.direction);

  const timerPosition0 = {
    top: 'calc(50% + 43rem)',
    left: 'calc(50% - 16rem)',
  };

  const timerPosition1 = {
    top: 'calc(50% + 29rem)',
    left: 'calc(50% - 48rem)',
  };

  const timerPosition2 = {
    top: 'calc(50% - 5rem)',
    left: 'calc(50% - 46rem)',
  };

  const timerPosition3 = {
    top: 'calc(50% - 5rem)',
    left: 'calc(50% + 40rem)',
  };

  const timerPosition4 = {
    top: 'calc(50% + 29rem)',
    left: 'calc(50% + 42rem)',
  };

  const positionsArray = [
    timerPosition0,
    timerPosition1,
    timerPosition2,
    timerPosition3,
    timerPosition4,
  ];

  const swap = useSpring({
    from: positionsArray[index],
    to:
      direction === 'CW'
        ? positionsArray[index === players.length - 1 ? 0 : index + 1]
        : positionsArray[index === 0 ? players.length - 1 : index - 1],

    duration: 1000,
    delay: 30000,
  });

  // direction === 'CW' ? style[`switchCW-${index}`] : style[`switchACW-${index}`]

  return (
    <animated.div className={[style.timerWrapper, style[`timer-${index}`]].join(' ')} style={swap}>
      <div className={style.timer}>
        <div className={style.shadow} onAnimationEnd={skipTurnHandler} />
      </div>
    </animated.div>
  );
};
