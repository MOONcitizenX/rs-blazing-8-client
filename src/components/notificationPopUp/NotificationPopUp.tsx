import { animated, useTransition } from '@react-spring/web';
import { useRoomState } from '../../store/roomStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import styles from './NotificationPopUp.module.css';
import warningIcon from '../../../public/warning-icon.svg';
import { usePlayerState } from '../../store/playerStore';

export const NotificationPopUp = () => {
  const isSoundOn = usePlayerState((state) => state.soundVolume);
  const error = useRoomState((state) => state.error);
  const setError = useRoomState((state) => state.setError);

  let interval: NodeJS.Timeout;
  const clearNotification = () => {
    clearInterval(interval);
    setError('');
  };

  if (error) {
    interval = setTimeout(() => {
      clearNotification();
    }, 3000);
  }

  const transition = useTransition(error, {
    from: { x: -200, opacity: 0 },
    enter: { x: 15, opacity: 1 },
    leave: { x: -200, opacity: 0 },
    config: { duration: 300 },
  });

  const closePopUp = () => {
    clearNotification();
    if (isSoundOn) {
      const player = SoundPlayer.getInstance();
      player.play('click');
    }
  };

  return transition(
    (style, item) =>
      item && (
        <animated.div style={style} className={styles.container}>
          <div className={styles.wrapper}>
            <img src={warningIcon} alt="warning" />
            <p className={styles.text}>{error}</p>
            <button className={styles.button} onClick={closePopUp} type="button">
              X
            </button>
          </div>
        </animated.div>
      ),
  );
};