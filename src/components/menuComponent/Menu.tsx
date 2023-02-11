import { useState } from 'react';
import { usePlayerState } from '../../store/playerStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import { CheckBox } from '../basicComponents/checkBox';
import styles from './Menu.module.css';
import { SettingsIcon } from './SettingsIcon';

const player = new SoundPlayer();

export const Menu = () => {
  const soundValue = usePlayerState((state) => state.sound);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const changeMusicValue = usePlayerState((state) => state.changeMusicValue);
  const changeSoundValue = usePlayerState((state) => state.changeSoundValue);

  const onSettingsClickHandler = () => {
    if (soundValue) player.play('click');
    setIsMenuOpened(!isMenuOpened);
  };
  const closeClickHandler = () => {
    if (soundValue) player.play('click');
    setIsMenuOpened(false);
  };

  const musicValueChangeHandler = (value: boolean) => {
    if (soundValue) player.play('click');
    changeMusicValue(value);
  };

  const soundValueChangeHandler = (value: boolean) => {
    if (soundValue) player.play('click');
    changeSoundValue(value);
  };

  return (
    <>
      <div
        className={isMenuOpened ? `${styles.menu} ${styles.opened}` : styles.menu}
        onClick={closeClickHandler}
        onKeyDown={closeClickHandler}
        role="presentation"
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
            <CheckBox isOn={soundValue} onChange={soundValueChangeHandler} />
          </li>
        </ul>
      </div>
      <SettingsIcon onClick={onSettingsClickHandler} />
    </>
  );
};
