import style from './playersWidget.module.css';
import eyeIcon from '../../assets/icons/eye.svg';

export const Players = () => {
  return (
    <div className={style.playersWrapper}>
      <div className={style.players}>123</div>
      <div className={style.spectators}>
        <div className={style.eye}>
          <img className={style.eyeImage} src={eyeIcon} alt="Eye" />
        </div>
      </div>
    </div>
  );
};
