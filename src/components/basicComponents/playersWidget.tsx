import style from './playersWidget.module.css';
import eyeIcon from '../../assets/icons/eye.svg';

export const Players = () => {
  return (
    <div className={style.playersWrapper}>
      <div className={style.players}>
        <button
          className={style.removeButton}
          type="button"
          onClick={() => {
            /* TODO move player to spectators */
          }}
        >
          <p>-</p>
        </button>
      </div>
      <div className={style.spectators}>
        <div className={style.eye}>
          <img className={style.eyeImage} src={eyeIcon} alt="Eye" />
        </div>
      </div>
    </div>
  );
};
