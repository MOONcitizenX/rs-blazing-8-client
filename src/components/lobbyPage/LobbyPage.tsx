import classNames from 'classnames';
import { AnimatedDots } from '../basicComponents/animatedDots';
import style from './LobbyPage.module.css';
import { Separator } from '../basicComponents/separator';
import { Button } from '../basicComponents/button';
import { Players } from '../basicComponents/playersWidget';
import { usePlayerState } from '../../store/playerStore';
import background1 from '../../assets/images/preview1.jpg';
import background2 from '../../assets/images/preview2.jpg';
import cardback1 from '../../assets/images/cardback1.png';
import cardback2 from '../../assets/images/cardback2.png';
import { backgroundsArray, cardbacksArray } from '../../store/basicMedia';
import { useRoomState } from '../../store/roomStore';

export const LobbyPage = () => {
  const playersAmount = useRoomState((state) => state.players.length);

  // const store = useRoomState((state) => state);
  // const isHost = store.userId === store.players[0].id;
  const isHost = true;

  const changeBackground = usePlayerState((state) => state.changeBackground);
  const stateBackground = usePlayerState((state) => state.background);

  const changeCardback = usePlayerState((state) => state.changeCardback);
  const stateCardback = usePlayerState((state) => state.cardback);

  return (
    <div className={style.startPageWrapper}>
      <Players />
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          {isHost ? (
            <div className={style.hostTable}>
              <div className={style.hostMessage}>
                Wait for more players
                <AnimatedDots />
              </div>
              <Separator />
              <Button attributes={{ className: 'start-button' }}>
                <p className={style.startMessage}>Start now!</p>
                <p className={style.playersMessage}>
                  <span className={style.players}>{playersAmount}</span> players
                </p>
              </Button>
            </div>
          ) : (
            <div className={style.guestMessage}>
              Waiting for game start
              <AnimatedDots />
            </div>
          )}

          <div className={style.patternWrapper}>
            <div className={style.backgroundWrapper}>
              <div className={style.backgroundTitle}>Background</div>
              <div className={style.backgrounds}>
                <Button
                  attributes={{
                    className: style.patternButton,
                    type: 'button',
                    onClick: () => {
                      changeBackground(backgroundsArray[0]);
                    },
                  }}
                >
                  <img
                    className={classNames(style.patternImage, {
                      [style.active]: stateBackground === backgroundsArray[0],
                    })}
                    src={background1}
                    alt="Western night background"
                  />
                </Button>
                <Button
                  attributes={{
                    className: style.patternButton,
                    type: 'button',
                    onClick: () => {
                      changeBackground(backgroundsArray[1]);
                    },
                  }}
                >
                  <img
                    className={classNames(style.patternImage, {
                      [style.active]: stateBackground === backgroundsArray[1],
                    })}
                    src={background2}
                    alt="Western day background"
                  />
                </Button>
              </div>
            </div>
            <div className={style.cardbackWrapper}>
              <div className={style.cardbackTitle}>Cardback</div>
              <div className={style.cardbacks}>
                <Button
                  attributes={{
                    className: style.patternButton,
                    type: 'button',
                    onClick: () => {
                      changeCardback(cardbacksArray[0]);
                    },
                  }}
                >
                  <img
                    className={classNames(style.patternImage, {
                      [style.active]: stateCardback === cardbacksArray[0],
                    })}
                    src={cardback1}
                    alt="Logo cardback"
                  />
                </Button>
                <Button
                  attributes={{
                    className: style.patternButton,
                    type: 'button',
                    onClick: () => {
                      changeCardback(cardbacksArray[1]);
                    },
                  }}
                >
                  <img
                    className={classNames(style.patternImage, {
                      [style.active]: stateCardback === cardbacksArray[1],
                    })}
                    src={cardback2}
                    alt="Patterned cardback"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
