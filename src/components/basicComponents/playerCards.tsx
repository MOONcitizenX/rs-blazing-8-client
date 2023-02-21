import { useSpring, animated } from '@react-spring/web';
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
  const cardback = usePlayerState((state) => state.cardback);
  const cardsArray = index === 0 ? cards : [...new Array(cards)];
  const setNewCards = useRoomState((state) => state.setNewCards);

  socket.on('swap-cards', ({ playerId, nextPlayerId, playerCards, nextPlayerCards }) => {
    setIsCardsSwap(true);
    setTimeout(() => {
      setNewCards({ playerId, nextPlayerId, playerCards, nextPlayerCards });
      setIsCardsSwap(false);
    }, 1000);
  });

  const swap = useSpring({
    from: { transform: 'translateY(0px) scale(1)' },
    to: [
      { transform: 'translateY(40px) scale(0.5)', delay: 1000 },
      { transform: 'translateY(0px) scale(1)', delay: 1000 },
    ],
    duration: 2000,
  });

  return (
    <animated.div
      className={[style.playerCards, style[`player-cards-${index}`]].join(' ')}
      style={isCardsSwap ? swap : undefined}
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
