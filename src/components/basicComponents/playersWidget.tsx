import style from './playersWidget.module.css';
import eyeIcon from '../../assets/icons/eye.svg';

export const Players = (/* accepts players data */) => {
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
          <p className={style.buttonText}>-</p>
        </button>
        <div className={style.hint}>Select to not play</div>

        {/* roomState.players.map(el => {
          return (<div className={style.player}>
          <img className={style.avatar} src={el.avatarId} alt="Players avatar" />
        </div>)
        }) */}
      </div>
      <div className={style.spectators}>
        <div className={style.eye}>
          <img className={style.eyeImage} src={eyeIcon} alt="Eye" />
        </div>
      </div>
    </div>
  );
};
