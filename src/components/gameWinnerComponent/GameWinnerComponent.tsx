import { Socket } from 'socket.io-client';
import { useSpring, useSpringRef, animated, useChain } from '@react-spring/web';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from './GameWinnerComponent.module.css';
import sloth from '../../assets/images/congrats.svg';
import { useRoomState } from '../../store/roomStore';
import { avatarsArray } from '../../store/basicMedia';
import { Button } from '../basicComponents/button';
import { usePlayerState } from '../../store/playerStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';

interface IGameWinnerComponentProps {
  socket: Socket<ClientToServerEvents>;
}

export const GameWinnerComponent = ({ socket }: IGameWinnerComponentProps) => {
  const setStatus = useRoomState((state) => state.setStatus);
  const setWinner = useRoomState((state) => state.setWinner);
  const winnerId = useRoomState((state) => state.winner);
  const playersArr = useRoomState((state) => state.players);
  const hostId = useRoomState((state) => state.players[0].id);
  const userId = useRoomState((state) => state.id);
  const isSoundOn = usePlayerState((state) => state.sound);
  const winnerData = playersArr.filter((player) => player.id === winnerId);
  const { name, avatarId } = winnerData[0];
  const isHost = hostId === userId;

  const runDownRef = useSpringRef();
  const runDownAnimation = useSpring({
    ref: runDownRef,
    from: { transform: 'translateY(-220rem)' },
    to: { transform: `translateY(${winnerId ? '0' : '-220rem'})` },
    config: { duration: 500 },
  });

  const opacityRef = useSpringRef();
  const opacityAnimation = useSpring({
    ref: opacityRef,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const scaleRef = useSpringRef();
  const scaleAnimation = useSpring({
    ref: scaleRef,
    from: { scale: '0.3' },
    to: { scale: '1' },
    config: { duration: 500 },
  });

  useChain([runDownRef, scaleRef, opacityRef]);

  if (isSoundOn) {
    const player = new SoundPlayer();
    player.play('win');
  }

  const leaveRoomHandler = () => {
    setStatus(null);
    setWinner(null);
    socket.emit('leave-room');
  };

  const convertToLobbyHandler = () => {
    setStatus('lobby');
    setWinner(null);
    socket.emit('convert-to-lobby');
  };

  const startNewGameHandler = () => {
    setStatus('playing');
    setWinner(null);
    socket.emit('start-game');
  };

  return (
    <>
      <ConfettiExplosion
        {...{
          className: styles.confetti,
          force: 0.8,
          duration: 5000,
          particleCount: 250,
          width: 1600,
        }}
      />
      <animated.div className={styles.wrapper} style={runDownAnimation}>
        <animated.div style={scaleAnimation} className={styles.imagWrapper}>
          <img src={avatarsArray[+avatarId]} alt="winner" />
          <img src={sloth} alt="congratulations" />
        </animated.div>
        <animated.div style={opacityAnimation} className={styles.winnerName}>
          {name}
        </animated.div>
        <animated.div className={styles.buttonsWrapper} style={opacityAnimation}>
          {isHost && (
            <Button attributes={{ onClick: () => convertToLobbyHandler() }}>Go to lobby</Button>
          )}
          <Button attributes={{ onClick: () => leaveRoomHandler() }}>Leave room</Button>
          {isHost && (
            <Button attributes={{ onClick: () => startNewGameHandler() }}>Once again</Button>
          )}
        </animated.div>
      </animated.div>
    </>
  );
};
