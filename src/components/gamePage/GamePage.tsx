import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
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
import { Player } from '../basicComponents/player';
import { Timer } from '../basicComponents/timer';
import { PlayerCards } from '../basicComponents/playerCards';
import { CardsSortButtons } from './gamePageModules/CardsSortButtons';

interface GamePageProps {
  socket: Socket<ClientToServerEvents>;
}

export const GamePage = ({ socket }: GamePageProps) => {
  const [isTurnCanBeSkipped, setIsTurnCanBeSkipped] = useState<boolean>(false);
  // const [isCardTaken, setIsCardTaken] = useState<boolean>(false);

  const playerTurn = useRoomState((state) => state.playerTurn);
  const myId = useRoomState((state) => state.id);
  const players = useRoomState((state) => state.players);
  const myIndex = players.findIndex((el) => el.id === myId);
  const orderedPlayers = [...players.slice(myIndex), ...players.slice(0, myIndex)];
  const myCards = orderedPlayers[0].cards.map((el) => cardMap[el]);
  const topCard = useRoomState((state) => state.topCard);
  const isPlayerTurn = playerTurn === myId;
  const cardsInDeck = useRoomState((state) => state.closedDeck);
  const isDeckEmpty = cardsInDeck === 0;

  const cardTakeHandler = () => {
    if (isPlayerTurn) {
      socket.emit('draw-card');
      setIsTurnCanBeSkipped(true);
      // setIsCardTaken(true);
    }
  };

  useEffect(() => {
    setIsTurnCanBeSkipped(false);
    if (isDeckEmpty && isPlayerTurn) {
      setIsTurnCanBeSkipped(true);
    }
  }, [playerTurn, isDeckEmpty, isPlayerTurn]);

  const endTurnHandler = () => {
    socket.emit('pass-turn');
    setIsTurnCanBeSkipped(false);
    // setIsCardTaken(false);
  };

  /* const skipTurnHandler = () => {
    if (!isCardTaken && isPlayerTurn) {
      socket.emit('draw-card');
    }
    socket.emit('pass-turn');
    setIsTurnCanBeSkipped(false);
    setIsCardTaken(false);
  }; */

  const cardWasPlayedHandler = () => {
    setIsTurnCanBeSkipped(false);
    // setIsCardTaken(false);
  };

  return (
    <div className={style.startPageWrapper}>
      <Players socket={socket} />
      <div className={style.tableWrapper}>
        {orderedPlayers.map((el, index) => {
          if (el.id === playerTurn) {
            return <Timer key={el.id} socket={socket} index={index} players={orderedPlayers} />;
          }
          return null;
        })}
        <TableArrows />
        <div className={style.tableFront}>{topCard ? <CardHint card={topCard} /> : null}</div>
        <div className={style.players}>
          {orderedPlayers.map((el, index) => {
            if (index !== 0) {
              return <Player key={el.id} player={el} />;
            }
            return null;
          })}
        </div>
        <div className={style.playersCards}>
          {orderedPlayers.map((el, index) => {
            return (
              <PlayerCards
                key={el.id}
                socket={socket}
                player={el}
                orderedPlayers={orderedPlayers}
                index={index}
              />
            );
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
        <CardsSortButtons />
      </div>
    </div>
  );
};
