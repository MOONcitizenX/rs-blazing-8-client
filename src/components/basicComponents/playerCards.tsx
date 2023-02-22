import { useSpring, animated } from '@react-spring/web';
import { Socket } from 'socket.io-client';
import { useState } from 'react';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import style from './playerCards.module.css';
import { usePlayerState } from '../../store/playerStore';
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';
import { getPlayerIndex } from '../../utils/getPlayerIndex';

interface PlayerCardsProps {
  player: IPlayerResponse;
  orderedPlayers: IPlayerResponse[];
  index: number;
  socket: Socket<ServerToClientEvents>;
}

export const PlayerCards = ({ socket, player, orderedPlayers, index }: PlayerCardsProps) => {
  const { cards, id } = player;
  const [playerIndex, setPlayerIndex] = useState<number | null>(null);
  const [nextPlayerIndex, setNextPlayerIndex] = useState<number | null>(null);
  const cardback = usePlayerState((state) => state.cardback);
  const cardsArray = index === 0 ? cards : [...new Array(cards)];

  socket.on('swap-cards', ({ playerId, nextPlayerId }) => {
    setPlayerIndex(getPlayerIndex(orderedPlayers, playerId));
    setNextPlayerIndex(getPlayerIndex(orderedPlayers, nextPlayerId));
  });

  const swap = useSpring({
    from: { transform: 'translateY(0px) scale(1)' },
    to: [{ transform: 'translateY(40px) scale(0.5)' }, { transform: 'translateY(0px) scale(1)' }],
    duration: 1000,
    onRest: () => {
      setPlayerIndex(null);
      setNextPlayerIndex(null);
    },
  });

  const checkSwapIndex = (handIndex: number) => {
    if (playerIndex === handIndex || nextPlayerIndex === handIndex) {
      return swap;
    }
    return undefined;
  };

  return (
    <animated.div
      className={[style.playerCards, style[`player-cards-${index}`]].join(' ')}
      style={checkSwapIndex(index)}
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
