import classNames from 'classnames';
import { useState } from 'react';
import { AnimatedDots } from '../basicComponents/animatedDots';
import style from './LobbyPage.module.css';
import background1 from '../../assets/images/preview1.jpg';
import background2 from '../../assets/images/preview2.jpg';
import cardback1 from '../../assets/images/cardback1.png';
import cardback2 from '../../assets/images/cardback2.png';
import { initialState, StateContext } from '../../state';
import { setLS } from '../../utils/localStorageHelpers';
import { Separator } from '../basicComponents/separator';
import { Button } from '../basicComponents/button';
import { Players } from '../basicComponents/playersWidget';

const bg1 = '../../assets/images/western-bg.jpg';
const bg2 = '../../assets/images/western-bg2.jpg';
const cb1 = '../../assets/images/cardback1.png';
const cb2 = '../../assets/images/cardback2.png';

export const LobbyPage = (/* accepts server info */) => {
  const [state, setState] = useState(initialState);

  return (
    <StateContext.Provider value={state}>
      <div className={style.startPageWrapper}>
        <Players />
        <div className={style.tableWrapper}>
          <div className={style.startTable}>
            {state.host ? (
              <div className={style.hostTable}>
                <div className={style.hostMessage}>
                  Wait for more players
                  <AnimatedDots />
                </div>
                <Separator />
                <Button attributes={{ className: 'start-button' }}>
                  <p className={style.startMessage}>Start now!</p>
                  <p className={style.playersMessage}>
                    <span className={style.players}>
                      {2 /* TODO replace with players amount from server */}
                    </span>{' '}
                    players
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
                  <button
                    className={style.patternButton}
                    type="button"
                    onClick={() => {
                      setState((prevState) => {
                        return {
                          ...prevState,
                          background: bg1,
                        };
                      });
                      setLS('state', state);
                    }}
                  >
                    <img
                      className={classNames(style.patternImage, {
                        [style.active]: state.background === bg1,
                      })}
                      src={background1}
                      alt="Western night background"
                    />
                  </button>
                  <button
                    className={style.patternButton}
                    type="button"
                    onClick={() => {
                      setState((prevState) => {
                        return {
                          ...prevState,
                          background: bg2,
                        };
                      });
                      setLS('state', state);
                    }}
                  >
                    <img
                      className={classNames(style.patternImage, {
                        [style.active]: state.background === bg2,
                      })}
                      src={background2}
                      alt="Western day background"
                    />
                  </button>
                </div>
              </div>
              <div className={style.cardbackWrapper}>
                <div className={style.cardbackTitle}>Cardback</div>
                <div className={style.cardbacks}>
                  <button
                    className={style.patternButton}
                    type="button"
                    onClick={() => {
                      setState((prevState) => {
                        return {
                          ...prevState,
                          cardback: cb1,
                        };
                      });
                      setLS('state', state);
                    }}
                  >
                    <img
                      className={classNames(style.patternImage, {
                        [style.active]: state.cardback === cb1,
                      })}
                      src={cardback1}
                      alt="Logo cardback"
                    />
                  </button>
                  <button
                    className={style.patternButton}
                    type="button"
                    onClick={() => {
                      setState((prevState) => {
                        return {
                          ...prevState,
                          cardback: cb2,
                        };
                      });
                      setLS('state', state);
                    }}
                  >
                    <img
                      className={classNames(style.patternImage, {
                        [style.active]: state.cardback === cb2,
                      })}
                      src={cardback2}
                      alt="Patterned cardback"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StateContext.Provider>
  );
};
