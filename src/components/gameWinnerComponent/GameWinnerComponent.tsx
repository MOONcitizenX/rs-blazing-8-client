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
  // const status = useRoomState((state) => state.status);
  const winnerId = useRoomState((state) => state.winner);
  const players = useRoomState((state) => state.players);
  const winner = players.find((player) => player.id === winnerId);
  const host = players.find((_, i) => i === 0);
  const hostId = host?.id;
  const userId = useRoomState((state) => state.id);
  const isHost = hostId === userId;
  const isSoundOn = usePlayerState((state) => state.sound);

  const runDownRef = useSpringRef();
  const runDownAnimation = useSpring({
    ref: runDownRef,
    transform: `translateY(${winner ? '0' : '-220rem'})`,
    config: { duration: 500 },
  });

  const opacityRef = useSpringRef();
  const opacityAnimation = useSpring({
    ref: opacityRef,

    opacity: winner ? 1 : 0,
    config: { duration: 1000 },
  });

  const scaleRef = useSpringRef();
  const scaleAnimation = useSpring({
    ref: scaleRef,
    scale: winner ? 1 : 0,
    config: { duration: 500 },
  });

  useChain([runDownRef, scaleRef, opacityRef]);

  if (isSoundOn) {
    const player = new SoundPlayer();
    player.play('win');
  }

  const leaveRoomHandler = () => {
    socket.emit('leave-room');
  };

  const convertToLobbyHandler = () => {
    socket.emit('convert-to-lobby');
  };

  const startNewGameHandler = () => {
    socket.emit('start-game');
  };

  return winner && winnerId ? (
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
          <img src={avatarsArray[Number(winner?.avatarId)]} alt="winner" />
          <img src={sloth} alt="congratulations" />
        </animated.div>
        <animated.div style={opacityAnimation} className={styles.winnerName}>
          {winner?.name}
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
  ) : null;
};
