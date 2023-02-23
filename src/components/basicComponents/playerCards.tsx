import { useSpring, animated } from '@react-spring/web';
import { Socket } from 'socket.io-client';
import { useState } from 'react';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import style from './playerCards.module.css';
import { usePlayerState } from '../../store/playerStore';
import { ServerToClientEvents } from '../../API/types/interfaces/ServerToClientEvents';
import { getPlayerIndex } from '../../utils/getPlayerIndex';
import { useRoomState } from '../../store/roomStore';

interface PlayerCardsProps {
  player: IPlayerResponse;
  orderedPlayers: IPlayerResponse[];
  index: number;
  socket: Socket<ServerToClientEvents>;
}

export const PlayerCards = ({ socket, player, orderedPlayers, index }: PlayerCardsProps) => {
  const { cards } = player;
  const [playerIndex, setPlayerIndex] = useState<number | null>(null);
  const [nextPlayerIndex, setNextPlayerIndex] = useState<number | null>(null);
  const cardback = usePlayerState((state) => state.cardback);
  const cardsArray = index === 0 ? cards : [...new Array(cards)];
  const topCard = useRoomState((state) => state.topCard?.image);
  const [cardPlayedIndex, setCardPlayedIndex] = useState<number | null>(null);

  socket.on('swap-cards', ({ playerId, nextPlayerId }) => {
    setPlayerIndex(getPlayerIndex(orderedPlayers, playerId));
    setNextPlayerIndex(getPlayerIndex(orderedPlayers, nextPlayerId));
  });

  socket.on('get-me', ({ id }) => {
    // сюда ивент, который даст айди сыгравшего
    setCardPlayedIndex(getPlayerIndex(orderedPlayers, id));
    setTimeout(() => {
      setCardPlayedIndex(null);
    }, 1000);
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

  /* useEffect(() => {
    setCardPlayedIndex(index);
    setTimeout(() => {
      setCardPlayedIndex(null);
    }, 1000);
  }, [topCard, index]); */

  const checkSwapIndex = (handIndex: number) => {
    if (playerIndex === handIndex || nextPlayerIndex === handIndex) {
      return swap;
    }
    return undefined;
  };

  const topCardXPositions = [7.5, 47.5, 36.5, -21.5, -32.5];
  const topCardYPositions = [-41.5, -12.5, 18.5, 18.5, -12.5];

  const layCardAnimation = useSpring({
    from: {
      transform: 'translate(0rem, 0rem) rotate(0deg)',
      opacity: 1,
    },
    to: {
      transform: `translate(${topCardXPositions[index]}rem, ${topCardYPositions[index]}rem) rotate(360deg)`,
      opacity: 1,
    },
    duration: 1000,
  });

  return (
    <animated.div
      className={[style.playerCards, style[`player-cards-${index}`]].join(' ')}
      style={checkSwapIndex(index)}
    >
      <animated.img
        className={style.topCard}
        src={topCard}
        alt="Card"
        style={cardPlayedIndex === index ? layCardAnimation : undefined}
      />
      {cardsArray.map((el, i) => {
        const count = index === 0 ? cards.length : +cards;
        const angle = 100;
        const offset = angle / 2;
        const increment = angle / (count + 1);

        return (
          <img
            key={`${el}-${i + 1}`}
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
