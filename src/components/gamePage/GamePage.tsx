import { useEffect, useRef, useState } from 'react';
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
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';
import { MyCardAnimated } from './gamePageModules/MyCardAnimated';

interface GamePageProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

export const GamePage = ({ socket }: GamePageProps) => {
  const [isTurnCanBeSkipped, setIsTurnCanBeSkipped] = useState<boolean>(false);
  const [isCardTaken, setIsCardTaken] = useState<boolean>(false);
  const playerTurn = useRoomState((state) => state.playerTurn);
  const myId = useRoomState((state) => state.id);
  const players = useRoomState((state) => state.players);
  const myIndex = players.findIndex((el) => el.id === myId);
  const orderedPlayers = [...players.slice(myIndex), ...players.slice(0, myIndex)];
  const myCards = orderedPlayers[0].cards.map((el) => cardMap[el]);
  const topCard = useRoomState((state) => state.topCard);
  const isPlayerTurn = playerTurn === myId;

  const closedDeckRef = useRef<HTMLImageElement>(null);
  const myHandRef = useRef<HTMLImageElement>(null);

  const [closedDeckX, setClosedDeckX] = useState<number>(0);
  const [closedDeckY, setClosedDeckY] = useState<number>(0);
  const [myHandX, setMyHandX] = useState<number>(0);
  const [myHandY, setMyHandY] = useState<number>(0);

  const [isDrawMyCard, setIsDrawMyCard] = useState<string | null>(null);

  socket.on('draw-card', (cardId) => {
    if (cardId) {
      if (cardId.cardId) {
        setIsDrawMyCard(cardId.cardId);
      }
    }
  });

  const getStartAndFinishCoords = () => {
    const closedDeck = closedDeckRef.current;
    if (closedDeck) {
      const rect = closedDeck.getBoundingClientRect();
      setClosedDeckX(rect.left);
      setClosedDeckY(rect.top);
    }

    const myHand = myHandRef.current;
    if (myHand) {
      const rect = myHand.getBoundingClientRect();
      setMyHandX(rect.left);
      setMyHandY(rect.top);
    }
  };

  useEffect(() => {
    getStartAndFinishCoords();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', getStartAndFinishCoords);

    return () => {
      window.removeEventListener('resize', getStartAndFinishCoords);
    };
  });

  console.log(closedDeckX, closedDeckY, myHandX, myHandY);

  const cardTakeHandler = () => {
    if (isPlayerTurn) {
      socket.emit('draw-card');
      setIsTurnCanBeSkipped(true);
      setIsCardTaken(true);
    }
  };

  const endTurnHandler = () => {
    socket.emit('pass-turn');
    setIsTurnCanBeSkipped(false);
    setIsCardTaken(false);
  };

  const skipTurnHandler = () => {
    if (!isCardTaken && isPlayerTurn) {
      socket.emit('draw-card');
    }
    socket.emit('pass-turn');
    setIsTurnCanBeSkipped(false);
    setIsCardTaken(false);
  };

  const cardWasPlayedHandler = () => {
    setIsTurnCanBeSkipped(false);
    setIsCardTaken(false);
  };

  return (
    <div className={style.startPageWrapper}>
      <Players socket={socket} />
      <div className={style.tableWrapper}>
        {orderedPlayers.map((el, index) => {
          if (el.id === playerTurn) {
            return (
              <Timer key={el.id} skipTurnHandler={skipTurnHandler} className={`timer-${index}`} />
            );
          }
          return null;
        })}
        <TableArrows />

        {isDrawMyCard && (
          <MyCardAnimated
            card={cardMap[isDrawMyCard]}
            coords={{ closedDeckX, closedDeckY, myHandX, myHandY }}
            cb={setIsDrawMyCard}
          />
        )}

        {/* Remove */}
        <div className={style.tableFront}>{topCard ? <CardHint card={topCard} /> : null}</div>
        <div className={style.players}>
          {orderedPlayers.map((el, index) => {
            if (index !== 0) {
              return <Player key={el.id} player={el} />;
            }
            return null;
          })}
        </div>
        <div className={style.startTable}>
          <GameDeckField
            ref={closedDeckRef}
            cardTakeHandler={cardTakeHandler}
            socket={socket}
            isCardTaken={isTurnCanBeSkipped}
            isPlayerTurn={isPlayerTurn}
          />
          <CardsInHand
            ref={myHandRef}
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
