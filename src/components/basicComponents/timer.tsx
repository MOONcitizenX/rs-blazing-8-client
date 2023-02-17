import { useRoomState } from '../../store/roomStore';
import style from './timer.module.css';

interface TimerProps {
  index: number;
  skipTurnHandler: () => void;
}

export const Timer = ({ index, skipTurnHandler }: TimerProps) => {
  const direction = useRoomState((state) => state.direction);

  return (
    <div
      className={[
        style.timerWrapper,
        style[`timer-${index}`],
        direction === 'CW' ? style[`switchCW-${index}`] : style[`switchACW-${index}`],
      ].join(' ')}
    >
      <div className={style.timer}>
        <div className={style.shadow} onAnimationEnd={skipTurnHandler} />
      </div>
    </div>
  );
};
