import { Avatar } from '../../basicComponents/avatar';
import holder from '../../../assets/images/avatars/activist.svg';
import { Arrow } from '../../basicComponents/arrow';
import style from './userAvatarChooseComponent.module.css';

interface AvatarChooseComponentProps {
  onAvatarChange: (id: number) => void;
}

export const AvatarChooseComponent = ({ onAvatarChange }: AvatarChooseComponentProps) => {
  return (
    <div className={style.choose__wrapper}>
      <Arrow />
      <Avatar attributes={{ src: holder }} />
      <Arrow className="right" />
    </div>
  );
};
