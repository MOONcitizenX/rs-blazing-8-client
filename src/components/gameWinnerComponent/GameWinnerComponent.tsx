import { useSpring, useTrail } from '@react-spring/web';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from './GameWinnerComponent.module.css';
import sloth from '../../assets/images/congrats.svg';

export const GameWinnerComponent = () => {
  return (
    <>
      <ConfettiExplosion
        {...{
          className: styles.confetti,
          force: 0.8,
          duration: 3000,
          particleCount: 250,
          width: 1600,
        }}
      />
      <div>GameWinnerComponent</div>
    </>
  );
};
