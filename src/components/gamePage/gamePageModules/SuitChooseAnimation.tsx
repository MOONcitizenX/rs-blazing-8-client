import { animated, useSpring } from '@react-spring/web';
import styles from './SuitChooseAnimation.module.css';
import { cardsIconsDataArr as data } from './SuitChoosePopUp';

export const SuitChooseAnimation = () => {
  const [animation, Api] = useSpring(
    () => ({
      from: { scale: 0.8 },
      to: { scale: 1.2 },
      loop: true,
    }),
    [],
  );
  return (
    <div className={styles.chooseAnimationWrapper}>
      <div className={styles.chooseAnimation}>
        <animated.div className={styles.transitionsItem}>
          <animated.div className={styles.top} style={animation}>
            <img className={styles.cardElement} src={data[0].icon} alt="Card color" />
          </animated.div>
          <div className={styles.middle}>
            <animated.div style={animation}>
              <img className={styles.cardElement} src={data[1].icon} alt="Card color" />
            </animated.div>
            <animated.div style={animation}>
              <img className={styles.cardElement} src={data[2].icon} alt="Card color" />
            </animated.div>
          </div>
          <animated.div className={styles.bottom} style={animation}>
            <img className={styles.cardElement} src={data[3].icon} alt="Card color" />
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};
