import { animated, useTransition } from '@react-spring/web';
import styles from './MenuOptions.module.css';
import { CheckBox } from '../basicComponents/checkBox';
import { usePlayerState } from '../../store/playerStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import { MusicPlayer } from '../../utils/MusicPlayer';

const soundPlayer = SoundPlayer.getInstance();
const musicPlayer = MusicPlayer.getInstance();

interface MenuOptionsProps {
  rulesChangeHandler: () => void;
}
export const MenuOptions = ({ rulesChangeHandler }: MenuOptionsProps) => {
  const soundVolume = usePlayerState((state) => state.soundVolume);
  const musicVolume = usePlayerState((state) => state.musicVolume);
  const changeSoundVolume = usePlayerState((state) => state.changeSoundVolume);
  const changeMusicVolume = usePlayerState((state) => state.changeMusicVolume);
  const isMusicOn = usePlayerState((state) => state.music);
  const isSoundOn = usePlayerState((state) => state.sound);
  const changeSoundValue = usePlayerState((state) => state.changeSoundValue);
  const changeMusicValue = usePlayerState((state) => state.changeMusicValue);

  const musicValueChangeHandler = (value: boolean) => {
    if (isSoundOn) soundPlayer.play('click');
    changeMusicValue(value);
  };

  const soundValueChangeHandler = (value: boolean) => {
    if (isSoundOn) soundPlayer.play('click');
    changeSoundValue(value);
  };

  const transitionOptions = {
    from: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20 },
    config: { duration: 500 },
  };
  const musicTransition = useTransition(isMusicOn, transitionOptions);
  const soundTransition = useTransition(isSoundOn, transitionOptions);

  const changeVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const newValue = +e.target.value / 100;
    if (type === 'music') {
      musicPlayer.volume = newValue;
      return changeMusicVolume(newValue);
    }
    soundPlayer.volume = newValue;
    return changeSoundVolume(newValue);
  };

  return (
    <ul
      style={{}}
      onClick={(e) => e.stopPropagation()}
      role="presentation"
      className={styles.menu__options}
    >
      <li aria-hidden onClick={() => rulesChangeHandler()} className={styles.menu__item}>
        <span className={styles.gameRules}>Game Rules</span>
      </li>
      <li className={styles.menu__item}>
        <span>Music</span>
        <CheckBox isOn={false} onChange={musicValueChangeHandler} />
      </li>
      {musicTransition(
        (style, item) =>
          item && (
            <animated.li style={style} className={styles.menu__item}>
              <input
                value={musicVolume * 100}
                className={styles.volumeInput}
                onChange={(e) => changeVolumeHandler(e, 'music')}
                type="range"
              />
            </animated.li>
          ),
      )}
      <li className={styles.menu__item}>
        <span>Sound Effects</span>
        <CheckBox isOn={isSoundOn} onChange={soundValueChangeHandler} />
      </li>
      {soundTransition(
        (style, item) =>
          item && (
            <animated.li style={style} className={styles.menu__item}>
              <input
                value={soundVolume * 100}
                className={styles.volumeInput}
                onChange={(e) => changeVolumeHandler(e, 'sound')}
                type="range"
              />
            </animated.li>
          ),
      )}
    </ul>
  );
};
