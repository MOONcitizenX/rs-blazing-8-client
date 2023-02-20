import { animated, useSpring } from '@react-spring/web';
import { Socket } from 'socket.io-client';
import { useState } from 'react';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import style from './playerCards.module.css';
import { usePlayerState } from '../../store/playerStore';
import { useRoomState } from '../../store/roomStore';
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';

interface PlayerCardsProps {
  player: IPlayerResponse;
  orderedPlayers: IPlayerResponse[];
  index: number;
  socket: Socket<ServerToClientEvents>;
}

export const PlayerCards = ({ socket, player, orderedPlayers, index }: PlayerCardsProps) => {
  const { cards, id } = player;
  const [isCardsSwap, setIsCardsSwap] = useState(false);
  const [swapPlayerIndex, setSwapPlayerIndex] = useState<number | null>(null);
  const [swapNextPlayerIndex, setNextSwapPlayerIndex] = useState<number | null>(null);

  const cardback = usePlayerState((state) => state.cardback);
  const cardsArray = index === 0 ? cards : [...new Array(cards)];
  const setNewCards = useRoomState((state) => state.setNewCards);

  /* const findNextPlayerIndex = (currentIndex: number | null) => {
    let nextPlayerIndex;
    if (currentIndex !== undefined && currentIndex !== null) {
      if (direction === 'CW') {
        if (currentIndex === players.length - 1) {
          nextPlayerIndex = 0;
        } else {
          nextPlayerIndex = currentIndex + 1;
        }
      } else if (currentIndex === 0) {
        nextPlayerIndex = players.length - 1;
      } else {
        nextPlayerIndex = currentIndex - 1;
      }
    } else {
      nextPlayerIndex = 0;
    }
    return nextPlayerIndex;
  }; */

  const cardsPosition0 = {
    top: 'calc(50% + 38rem)',
    left: 'calc(50% + 0rem)',
  };

  const cardsPosition1 = {
    top: 'calc(50% + -19rem)',
    left: 'calc(50% + -40rem)',
  };

  const cardsPosition2 = {
    top: 'calc(50% + -81rem)',
    left: 'calc(50% + -29rem)',
  };

  const cardsPosition3 = {
    top: 'calc(50% + -81rem)',
    left: 'calc(50% + 29rem)',
  };

  const cardsPosition4 = {
    top: 'calc(50% + -19rem)',
    left: 'calc(50% + 40rem)',
  };

  const positionsArray = [
    cardsPosition0,
    cardsPosition1,
    cardsPosition2,
    cardsPosition3,
    cardsPosition4,
  ];

  const swap = useSpring({
    from: positionsArray[swapPlayerIndex],
    to: positionsArray[swapNextPlayerIndex],
    duration: 5000,
  });

  const swap2 = useSpring({
    from: positionsArray[swapNextPlayerIndex],
    to: positionsArray[swapPlayerIndex],
    duration: 5000,
  });

  socket.on('swap-cards', ({ playerId, nextPlayerId, playerCards, nextPlayerCards }) => {
    setIsCardsSwap(true);
    setSwapPlayerIndex(orderedPlayers.findIndex((el) => el.id === playerId));
    setNextSwapPlayerIndex(orderedPlayers.findIndex((el) => el.id === nextPlayerId));

    setNewCards({ playerId, nextPlayerId, playerCards, nextPlayerCards });
    setTimeout(() => {
      setIsCardsSwap(false);
    }, 3000);
  });

  const checkSwapAnimation = () => {
    if (isCardsSwap && swapPlayerIndex === index) {
      return swap;
    }
    if (isCardsSwap && swapNextPlayerIndex === index) {
      return swap2;
    }
    return undefined;
  };

  return (
    <animated.div
      className={[style.playerCards, style[`player-cards-${index}`]].join(' ')}
      style={checkSwapAnimation()}
    >
      {cardsArray.map((_, i) => {
        const count = index === 0 ? cards.length : +cards;
        const angle = 100;
        const offset = angle / 2;
        const increment = angle / (count + 1);

        return (
          <img
            key={`${id}-${i + 1}`}
            className={style.playerCard}
            style={{
              transform: `translate(-50%, -50%) rotate(${-offset + increment * (i + 1)}deg)`,
            }}
            src={cardback}
            alt="Card"
          />
        );
      })}
    </animated.div>
  );
};
