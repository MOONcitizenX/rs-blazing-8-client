import style from './timer.module.css';

interface TimerProps {
  className: string;
  skipTurnHandler: () => void;
}

export const Timer = ({ className, skipTurnHandler }: TimerProps) => {
  return (
    <div className={[style.timerWrapper, style[className]].join(' ')}>
      <div className={style.timer}>
        <div className={style.shadow} onAnimationEnd={skipTurnHandler} />
      </div>
    </div>
  );
};
