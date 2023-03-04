import { useSpring, animated } from '@react-spring/web';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { IPlayerResponse } from '../../../API/types/interfaces/IPlayerResponse';
import style from './PlayerCards.module.css';
import { usePlayerState } from '../../../store/playerStore';
import { ServerToClientEvents } from '../../../API/types/interfaces/ServerToClientEvents';
import { getPlayerIndex } from '../../../utils/getPlayerIndex';
import { useRoomState } from '../../../store/roomStore';
import { cardMap } from '../../../utils/cardsMap';
import { ICard } from '../../../store/types/interfaces/ICard';

interface PlayerCardsProps {
  player: IPlayerResponse;
  orderedPlayers: IPlayerResponse[];
  index: number;
  socket: Socket<ServerToClientEvents>;
}

export const PlayerCards = ({ socket, player, orderedPlayers, index }: PlayerCardsProps) => {
  const { cards, online } = player;
  const [playerIndex, setPlayerIndex] = useState<number | null>(null);
  const [nextPlayerIndex, setNextPlayerIndex] = useState<number | null>(null);
  const cardback = usePlayerState((state) => state.cardback);
  const cardsArray = index === 0 ? cards : [...new Array(cards)];
  const topCard = useRoomState((state) => state.topCard?.image);
  const [cardPlayedIndex, setCardPlayedIndex] = useState<number | null>(null);
  const [cardDrawIndex, setCardDrawIndex] = useState<number | null>(null);
  const [cardDraw, setCardDraw] = useState<ICard | null>(null);
  const eightCardImage = 'https://raw.githubusercontent.com/mkoroleva5/blazing-8s-cards/main/8.png';

  const getCardDrawImage = () => {
    if (cardDraw) {
      if (cardDraw?.value === '8') {
        return eightCardImage;
      }
      return cardDraw.image;
    }
    return undefined;
  };

  socket.on('swap-cards', ({ playerId, nextPlayerId }) => {
    setPlayerIndex(getPlayerIndex(orderedPlayers, playerId));
    setNextPlayerIndex(getPlayerIndex(orderedPlayers, nextPlayerId));
  });

  socket.on('player-played-card', ({ id }) => {
    setCardPlayedIndex(getPlayerIndex(orderedPlayers, id));
  });

  socket.on('card-draw', ({ id, cardId }) => {
    if (cardId) {
      setCardDraw(cardMap[cardId]);
    }
    setCardDrawIndex(getPlayerIndex(orderedPlayers, id));
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

  useEffect(() => {
    setTimeout(() => {
      setCardPlayedIndex(null);
    }, 1000);
  }, [cardPlayedIndex]);

  useEffect(() => {
    setTimeout(() => {
      setCardDrawIndex(null);
    }, 500);
  }, [cardDrawIndex]);

  const checkSwapIndex = (handIndex: number) => {
    if (playerIndex === handIndex || nextPlayerIndex === handIndex) {
      return swap;
    }
    return undefined;
  };

  const topCardXPositions = [7, 47, 36, -22, -33];
  const topCardYPositions = [-42, -13.5, 17.5, 17.5, -13.5];

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

  const drawCardXFromPositions = [-13, 27, 16, -42, -53];
  const drawCardYFromPositions = [-40.5, 16.5, 78.5, 78.5, 16.5];

  const drawCardXToPositions = [-5.5, -6, -6, -5, -5];
  const drawCardYToPositions = [-12, 25.5, 56.5, 56.5, 25.5];

  const drawCardAnimation = useSpring({
    from: {
      transform: `translate(${drawCardXFromPositions[index]}rem, ${drawCardYFromPositions[index]}rem) scale(1)`,
      opacity: 1,
      zIndex: 1,
    },
    to: {
      transform: `translate(${drawCardXToPositions[index]}rem, ${
        drawCardYToPositions[index]
      }rem) scale(${index === 0 ? 1 : 0.6})`,
      opacity: 1,
      zIndex: 3,
    },
    duration: 1000,
  });

  return (
    <animated.div
      className={classNames([style.playerCards, style[`player-cards-${index}`]].join(' '), {
        [style.offline]: !online,
      })}
      style={checkSwapIndex(index)}
    >
      <animated.img
        className={style.topCard}
        src={topCard}
        alt="Card"
        style={cardPlayedIndex === index ? layCardAnimation : undefined}
      />
      <animated.img
        className={[style.drawCard, style[`draw-card-${index}`]].join(' ')}
        src={cardDrawIndex === 0 ? getCardDrawImage() : cardback}
        alt="Card"
        style={cardDrawIndex === index ? drawCardAnimation : undefined}
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
