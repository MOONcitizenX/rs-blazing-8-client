import { animated, useTransition } from '@react-spring/web';
import { useRoomState } from '../../store/roomStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import styles from './NotificationPopUp.module.css';

export const NotificationPopUp = () => {
  const error = useRoomState((state) => state.error);
  const setError = useRoomState((state) => state.setError);

  let interval: NodeJS.Timeout;
  const clearNotification = () => {
    clearInterval(interval);
    setError('');
  };

  if (error) {
    const player = new SoundPlayer();
    player.play('notification');
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

  return transition(
    (style, item) =>
      item && (
        <animated.div style={style} className={styles.container}>
          <div className={styles.wrapper}>
            <div>Icon</div>
            <p className={styles.text}>{error}text</p>
            <button className={styles.button} onClick={clearNotification} type="button">
              X
            </button>
          </div>
        </animated.div>
      ),
  );
};
