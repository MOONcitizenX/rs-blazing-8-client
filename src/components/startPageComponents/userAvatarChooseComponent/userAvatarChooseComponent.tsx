import { Avatar } from '../../basicComponents/avatar';
import holder from '../../../assets/images/avatars/activist.svg';
import { Arrow } from '../../basicComponents/arrow';
import style from './userAvatarChooseComponent.module.css';

export const AvatarChooseComponent = () => {
  const [index, setIndex] = useState<number>(0);
  const [avatarImg, setAvatarImg] = useState<string>(avatarsArray[0]);
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

export const AvatarChooseComponent = ({ onAvatarChange }: AvatarChooseComponentProps) => {
  return (
    <div className={style.choose__wrapper}>
      <Arrow />
      <Avatar attributes={{ src: holder }} />
      <Arrow className="right" />
    </div>
  );
};
