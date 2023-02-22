import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';
import { useRoomState } from '../../store/roomStore';
import style from './timer.module.css';

interface TimerProps {
  socket: Socket<ServerToClientEvents>;
  index: number;
  players: IPlayerResponse[];
}

export const Timer = ({ socket, index, players }: TimerProps) => {
  const direction = useRoomState((state) => state.direction);
  const [timerContent, setTimerContent] = useState(30);
  const [updatedTimerCount, setUpdatedTimerCount] = useState(30);
  const [isTimerSwap, setIsTimerSwap] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const timerPosition0 = {
    top: 'calc(50% + 43rem)',
    left: 'calc(50% + -16rem)',
  };

  const timerPosition1 = {
    top: 'calc(50% + 29rem)',
    left: 'calc(50% + -48rem)',
  };

  const timerPosition2 = {
    top: 'calc(50% + -5rem)',
    left: 'calc(50% + -46rem)',
  };

  const timerPosition3 = {
    top: 'calc(50% + -5rem)',
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

  socket.on('timer-update', ({ id, timerCount }) => {
    setTimerContent(timerCount);
    setUpdatedTimerCount(timerCount);
    setCurrentId(id);
    setIsTimerSwap(true);
    setTimeout(() => {
      setIsTimerSwap(false);
    }, 1000);
  });

  /* socket.on('timer-out', ({ id }) => {
    setIsTimerSwap(true);
    setTimeout(() => {
      setIsTimerSwap(false);
    }, 1000);
  }); */

  const currentIndex = players.findIndex((el) => el.id === currentId);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerContent((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timerContent]);

  const swap = useSpring({
    from: positionsArray[index],
    to: positionsArray[currentIndex],
    // to:
    //  direction === 'CW'
    //    ? positionsArray[index === players.length - 1 ? 0 : index + 1]
    //    : positionsArray[index === 0 ? players.length - 1 : index - 1],

    duration: 1000,
    // TODO when turn is skipped, card is laid out or the timer has expired
  });

  const currentTranslate = (updatedTimerCount / 30) * 100;
  const currenDuration = currentTranslate * 1000;

  const shadowAnimation = useSpring({
    from: { transform: `translateY(${currentTranslate}%)` },
    to: { transform: `translateY(100%)` },
    duration: currenDuration,
  });

  // isTimerSwap ? swap : undefined

  return (
    <animated.div
      className={[style.timerWrapper, style[`timer-${index}`]].join(' ')}
      style={isTimerSwap ? swap : undefined}
    >
      <div className={style.timer}>
        <animated.div className={style.shadow} style={shadowAnimation} />
        <p className={style.timerCount}>{timerContent}</p>
      </div>
    </animated.div>
  );
};
