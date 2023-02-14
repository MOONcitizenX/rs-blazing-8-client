import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { avatarsArray } from '../../store/basicMedia';
import { useRoomState } from '../../store/roomStore';
import { Players } from '../basicComponents/playersWidget';
import style from './GamePage.module.css';
import { usePlayerState } from '../../store/playerStore';
import { cardMap } from '../../utils/cardsMap';
import { CardHint } from '../basicComponents/cardHint';
import tableFrontImage from '../../assets/images/table-front.png';
import { TableArrows } from '../basicComponents/tableArrows';
import { GameDeckField } from './gamePageModules/GameDeckField';
import { CardsInHand } from './gamePageModules/CardsInHand';
import { Button } from '../basicComponents/button';
import { ClientToServerEvents } from '../../API/types/interfaces/ClientToServerEvents';

interface GamePageProps {
  socket: Socket<ClientToServerEvents>;
}

export const GamePage = ({ socket }: GamePageProps) => {
  const [isTurnCanBeSkipped, setIsTurnCanBeSkipped] = useState<boolean>(false);
  const playerTurn = useRoomState((state) => state.playerTurn);
  const myId = usePlayerState((state) => state.id);
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

  return (
    <div className={style.startPageWrapper}>
      <Players />
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          <GameDeckField cardTakeHandler={cardTakeHandler} />
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
          <CardsInHand socket={socket} isPlayerTurn={isPlayerTurn} cardsInHand={myCards} />
          <Button
            attributes={{
              disabled: !isTurnCanBeSkipped,
              onClick: endTurnHandler,
              className: style.skipTurn,
            }}
          >
            Skip move
          </Button>
          {topCard ? <CardHint card={topCard} /> : null}
        </div>
      </div>
    </div>
  );
};
