import { useSpring, animated, config } from '@react-spring/web';
import { useRoomState } from '../../store/roomStore';
import minion from '../../assets/images/giphy.gif';
import styles from './OneCardAlert.module.css';

export const OneCardAlert = () => {
  const isOneCardLeft = useRoomState((state) => state.oneCardLeft);

  const props = useSpring({
    from: { opacity: isOneCardLeft ? 0 : 1 },
    to: { opacity: isOneCardLeft ? 1 : 0 },

    config: { ...config.slow },
  });

  return isOneCardLeft ? (
    <animated.div style={props} className={styles.oneCardAlert}>
      <img src={minion} alt="One card left" className={styles.gif} />
    </animated.div>
  ) : null;
};
