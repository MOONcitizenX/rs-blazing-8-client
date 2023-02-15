import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { avatarsArray } from '../../store/basicMedia';
import { useRoomState } from '../../store/roomStore';
import { Players } from '../basicComponents/playersWidget';
import style from './GamePage.module.css';
import { cardMap } from '../../utils/cardsMap';
import { CardHint } from '../basicComponents/cardHint';
import { TableArrows } from '../basicComponents/tableArrows';
import { GameDeckField } from './gamePageModules/GameDeckField';
import { CardsInHand } from './gamePageModules/CardsInHand';
import { Button } from '../basicComponents/button';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../../store/playerStore';

interface GamePageProps {
  socket: Socket<ClientToServerEvents>;
}

export const GamePage = ({ socket }: GamePageProps) => {
  const [isTurnCanBeSkipped, setIsTurnCanBeSkipped] = useState<boolean>(false);
  const playerTurn = useRoomState((state) => state.playerTurn);
  const myId = useRoomState((state) => state.id);
  const cardback = usePlayerState((state) => state.cardback);
  const players = useRoomState((state) => state.players);
  const myIndex = players.findIndex((el) => el.id === myId);
  const orderedPlayers = [...players.slice(myIndex), ...players.slice(0, myIndex)];
  const myCards = orderedPlayers[0].cards.map((el) => cardMap[el]);
  const topCard = useRoomState((state) => state.topCard);
  const isPlayerTurn = playerTurn === myId;

  const cardTakeHandler = () => {
    if (isPlayerTurn) {
      socket.emit('draw-card');
      setIsTurnCanBeSkipped(true);
    }
  };

  const endTurnHandler = () => {
    socket.emit('pass-turn');
    setIsTurnCanBeSkipped(false);
  };

  const cardWasPlayedHandler = () => {
    setIsTurnCanBeSkipped(false);
  };

  return (
    <div className={style.startPageWrapper}>
      <Players />
      <div className={style.tableWrapper}>
        <TableArrows />
        <div className={style.tableFront}>{topCard ? <CardHint card={topCard} /> : null}</div>
        <div className={style.players}>
          {orderedPlayers.map((el, index) => {
            if (index !== 0) {
              return (
                <div key={el.id} className={style.playerWrapper}>
                  <div className={style.playerCards}>
                    {[...new Array(+el.cards)].map((_, i) => {
                      const count = +el.cards;
                      const angle = 100;
                      const offset = angle / 2;
                      const increment = angle / (count + 1);

                      return (
                        <img
                          key={`${el.id}-${i + 1}`}
                          className={style.playerCard}
                          style={{
                            transform: `translate(-50%, -50%) rotate(${
                              -offset + increment * (i + 1)
                            }deg)`,
                          }}
                          src={cardback}
                          alt="Card"
                        />
                      );
                    })}
                  </div>
                  <div className={style.player}>
                    <img
                      className={style.avatar}
                      src={avatarsArray[+el.avatarId]}
                      alt="Player avatar"
                    />
                    <div className={style.name}>{el.name}</div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className={style.startTable}>
          <GameDeckField
            cardTakeHandler={cardTakeHandler}
            socket={socket}
            isCardTaken={isTurnCanBeSkipped}
            isPlayerTurn={isPlayerTurn}
          />
          <CardsInHand
            cardWasPlayed={cardWasPlayedHandler}
            socket={socket}
            isPlayerTurn={isPlayerTurn}
            cardsInHand={myCards}
          />
          <Button
            attributes={{
              disabled: !isTurnCanBeSkipped,
              onClick: endTurnHandler,
              className: style.skipTurn,
            }}
          >
            Skip move
          </Button>
        </div>
      </div>
    </div>
  );
};
