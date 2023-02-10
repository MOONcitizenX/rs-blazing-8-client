import { useState } from 'react';
import { Avatar } from '../../basicComponents/avatar';
import { Arrow } from '../../basicComponents/arrow';
import style from './userAvatarChooseComponent.module.css';
import { usePlayerState } from '../../../store/playerStore';
import { avatarsArray } from '../../../store/basicMedia';

export const AvatarChooseComponent = () => {
  const currentAvatar = usePlayerState((state) => state.avatarId);

  const [index, setIndex] = useState<number>(0);
  const [avatarImg, setAvatarImg] = useState<string>(
    avatarsArray[+currentAvatar] || avatarsArray[0],
  );
  const changeAvatarId = usePlayerState((state) => state.changeAvatarId);

  const leftClickHandler = () => {
    let newIndex = index - 1;
    newIndex = newIndex < 0 ? avatarsArray.length - 1 : newIndex;
    setIndex(newIndex);
    changeAvatarId(`${newIndex}`);
    setAvatarImg(avatarsArray[newIndex]);
  };

  const rightClickHandler = () => {
    let newIndex = index + 1;
    newIndex = newIndex >= avatarsArray.length ? 0 : newIndex;
    setIndex(newIndex);
    changeAvatarId(`${newIndex}`);
    setAvatarImg(avatarsArray[newIndex]);
  };

  return (
    <div className={style.choose__wrapper}>
      <Arrow onClick={leftClickHandler} />
      <Avatar attributes={{ src: avatarImg }} />
      <Arrow onClick={rightClickHandler} className="right" />
    </div>
  );
};
