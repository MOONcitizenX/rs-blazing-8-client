import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { usePlayerState } from '../../store/playerStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import { CheckBox } from '../basicComponents/checkBox';
import styles from './Menu.module.css';
import { SettingsIcon } from './SettingsIcon';

const player = new SoundPlayer();

export const Menu = () => {
  const isSoundOn = usePlayerState((state) => state.sound);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const changeMusicValue = usePlayerState((state) => state.changeMusicValue);
  const changeSoundValue = usePlayerState((state) => state.changeSoundValue);

  const props = useSpring({
    opacity: isMenuOpened ? 1 : 0,
    transform: `translateY(${isMenuOpened ? '0' : '-220rem'})`,
    config: { duration: 500 },
  });

  const closeClickHandler = () => {
    if (isSoundOn) player.play('click');
    setIsMenuOpened(false);
  };

  const onSettingsClickHandler = () => {
    if (isSoundOn) player.play('click');
    if (isMenuOpened) {
      closeClickHandler();
    }
    setIsMenuOpened(!isMenuOpened);
  };

  const musicValueChangeHandler = (value: boolean) => {
    if (isSoundOn) player.play('click');
    changeMusicValue(value);
  };

  const soundValueChangeHandler = (value: boolean) => {
    if (isSoundOn) player.play('click');
    changeSoundValue(value);
  };

  return (
    <>
      <animated.div
        className={styles.menu}
        onClick={closeClickHandler}
        onKeyDown={closeClickHandler}
        role="presentation"
        style={props}
      >
        <ul
          onClick={(e) => e.stopPropagation()}
          role="presentation"
          className={styles.menu__options}
        >
          <li className={styles.menu__item}>
            <span>Music</span>
            <CheckBox isOn={false} onChange={musicValueChangeHandler} />
          </li>
          <li className={styles.menu__item}>
            <span>Sound Effects</span>
            <CheckBox isOn={isSoundOn} onChange={soundValueChangeHandler} />
          </li>
        </ul>
      </animated.div>
      <SettingsIcon onClick={onSettingsClickHandler} />
    </>
  );
};
