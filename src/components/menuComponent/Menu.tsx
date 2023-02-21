import { useState } from 'react';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { usePlayerState } from '../../store/playerStore';
import { SoundPlayer } from '../../utils/SoundPlayer';
import styles from './Menu.module.css';
import { SettingsIcon } from './SettingsIcon';
import { GameRules } from './GameRules';
import { MenuOptions } from './MenuOptions';

const soundPlayer = SoundPlayer.getInstance();

export const Menu = () => {
  const isSoundOn = usePlayerState((state) => state.sound);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isRuleOpen, setIsRuleOpen] = useState<boolean>(false);

  const props = useSpring({
    opacity: isMenuOpened ? 1 : 0,
    transform: `translateY(${isMenuOpened ? '0' : '-220rem'})`,
    config: { duration: 500 },
  });

  const closeClickHandler = () => {
    if (isSoundOn) soundPlayer.play('click');
    setIsMenuOpened(false);
  };

  const onSettingsClickHandler = () => {
    if (isSoundOn) soundPlayer.play('click');
    setIsMenuOpened(!isMenuOpened);
  };

  const ruleOptionChange = useTransition(isRuleOpen, {
    from: { x: -200, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 200, opacity: 0 },
  });

  const rulesChangeHandler = () => {
    setIsRuleOpen(!isRuleOpen);
  };

  return (
    <>
      <animated.div
        className={styles.menu}
        onClick={closeClickHandler}
        role="presentation"
        style={props}
      >
        {ruleOptionChange((style, item) =>
          item ? (
            <animated.div style={style} className={styles.option}>
              <GameRules rulesChangeHandler={rulesChangeHandler} />
            </animated.div>
          ) : (
            <animated.div style={style} className={styles.option}>
              <MenuOptions rulesChangeHandler={rulesChangeHandler} />
            </animated.div>
          ),
        )}
      </animated.div>
      <SettingsIcon onClick={onSettingsClickHandler} />
    </>
  );
};
