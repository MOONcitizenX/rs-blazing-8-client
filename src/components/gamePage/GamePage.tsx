import { avatarsArray } from '../../store/basicMedia';
import { useRoomState } from '../../store/roomStore';
import { Players } from '../basicComponents/playersWidget';
import style from './GamePage.module.css';
import { usePlayerState } from '../../store/playerStore';
import cards from '../../cards.json';
import { CardHint } from '../basicComponents/cardHint';
import tableFrontImage from '../../assets/images/table-front.png';
import { TableArrows } from '../basicComponents/tableArrows';

export const GamePage = () => {
  const players = useRoomState((state) => state.players);
  const myId = usePlayerState((state) => state.id);
  const myIndex = players.findIndex((el) => el.id === myId);
  const orderedPlayers = [...players.slice(myIndex), ...players.slice(0, myIndex)];

  // TODO adjust type of el
  const myCards = orderedPlayers[0].cards.map((el) => cards[el]);
  const topCard = useRoomState((state) => state.topCard);

  const count = myCards.length;
  const angle = 35;
  const offset = angle / 2;
  const increment = angle / (count + 1);

  return (
    <div className={style.startPageWrapper}>
      <Players />
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          <img className={style.tableFront} src={tableFrontImage} alt="Table" />
          <TableArrows />
          <div className={style.players}>
            {orderedPlayers.map((el, index) => {
              if (index !== 0) {
                return (
                  <div key={el.id} className={style.player}>
                    <img
                      className={style.avatar}
                      src={avatarsArray[+el.avatarId]}
                      alt="Player avatar"
                    />
                    <div className={style.name}>{el.name}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={style.cardsWrapper}>
            {myCards.map((el, index) => {
              return (
                <div key={`${el.value}-${el.color}`}>
                  <img
                    style={{
                      transform: `translate(-50%, -50%) rotate(${-offset + increment * index}deg)`,
                    }}
                    className={style.myCard}
                    src={el.image}
                    alt="Card"
                  />
                </div>
              );
            })}
          </div>
          {topCard ? <CardHint card={topCard} /> : null}
        </div>
      </div>
    </div>
  );
};
