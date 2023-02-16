import style from './timer.module.css';

interface TimerProps {
  className: string;
  skipTurnHandler: () => void;
}

export const Timer = ({ className, skipTurnHandler }: TimerProps) => {
  return (
    <div className={[style.timerWrapper, style[className]].join(' ')}>
      <div className={style.timer} onAnimationEnd={skipTurnHandler}>
        <div className={style.shadow} />
      </div>
    </div>
  );
};
