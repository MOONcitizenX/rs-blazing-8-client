import { usePlayerState } from '../../store/playerStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import styles from './arrow.module.css';

interface ArrowProps {
  onClick: () => void;
  className?: string;
}
export const Arrow = ({ className, onClick }: ArrowProps) => {
  // arrow directions in className: top, bottom, right. init state left
  const isSoundOn = usePlayerState((state) => state.sound);
  const player = new SoundPlayer();
  const clicKHandler = () => {
    if (isSoundOn) player.play('click');
    onClick();
  };
  return (
    <svg
      onClick={clicKHandler}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className ? [styles.arrow, styles[className]].join(' ') : styles.arrow}
    >
      <g>
        <path d="M21,8H11V5a1,1,0,0,0-1.707-.707l-7,7a1,1,0,0,0,0,1.414l7,7A1,1,0,0,0,11,19V16H21a1,1,0,0,0,1-1V9A1,1,0,0,0,21,8Z" />
      </g>
    </svg>
  );
};
