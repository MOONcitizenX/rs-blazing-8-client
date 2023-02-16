import { useState } from 'react';
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

interface GamePageProps {
  socket: Socket<ClientToServerEvents>;
}

export const GamePage = ({ socket }: GamePageProps) => {
  const [isTurnCanBeSkipped, setIsTurnCanBeSkipped] = useState<boolean>(false);
  const playerTurn = useRoomState((state) => state.playerTurn);
  const myId = useRoomState((state) => state.id);
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
              return <Player key={el.id} player={el} />;
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
