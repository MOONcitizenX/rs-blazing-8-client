import classNames from 'classnames';
import { useSpring, animated } from '@react-spring/web';
import { Socket } from 'socket.io-client';
import { useMemo, useState } from 'react';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import { ICard } from '../../../store/types/interfaces/ICard';
import { SoundPlayer } from '../../../utils/SoundPlayer';
import styles from './CardsInHand.module.css';
import { ServerToClientEvents } from '../../../API/types/interfaces/ServerToClientEvents';

interface CardsInHandProps {
  cardsInHand: ICard[];
  isPlayerTurn: boolean;
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  cardWasPlayed: () => void;
}
export const CardsInHand = ({
  socket,
  cardsInHand,
  isPlayerTurn,
  cardWasPlayed,
}: CardsInHandProps) => {
  const sortValue = usePlayerState((state) => state.cardsSort);
  const [isLoaded, setIsLoaded] = useState(false);
  const isSoundOn = usePlayerState((state) => state.sound);
  const player = SoundPlayer.getInstance();
  const eightCardImage = 'https://raw.githubusercontent.com/mkoroleva5/blazing-8s-cards/main/8.png';
  const cardOnTop = useRoomState((state) => state.topCard);
  const count = cardsInHand.length;
  const angle = 40;
  const offset = angle / 2;
  const increment = angle / (count + 1);
  const myId = useRoomState((state) => state.id);

  const sortedCardsArr = useMemo(() => {
    if (sortValue === 'value') {
      return [...cardsInHand].sort((a, b) => a.sortValue - b.sortValue);
    }
    if (sortValue === 'suit') {
      return [...cardsInHand].sort((a, b) => a.color.localeCompare(b.color));
    }
    return cardsInHand;
  }, [cardsInHand, sortValue]);
  const isCardPlayable = (topCard: ICard | null, playerCard: ICard) => {
    return (
      topCard &&
      (playerCard.value === topCard.value ||
        playerCard.color === topCard.color ||
        playerCard.value === '8' ||
        playerCard.value === 'swap')
    );
  };

  const cardPlayHandler = (
    e: React.MouseEvent<HTMLImageElement>,
    isPlayable: boolean | null,
    cardId: string,
    cardValue: string,
  ) => {
    if (isPlayable) {
      if (isSoundOn) player.play('playCard');
      cardWasPlayed();
      if (cardValue === '8') {
        socket.emit('choose-color');
        return;
      }
      socket.emit('play-card', { card: cardId });
    }
  };

  const [isCardsSwap, setIsCardsSwap] = useState(false);

  socket.on('swap-cards', ({ playerId, nextPlayerId }) => {
    setIsCardsSwap(() => playerId === myId || nextPlayerId === myId);
    setTimeout(() => {
      setIsCardsSwap(false);
    }, 1000);
  });

  const swap = useSpring({
    from: { transform: 'translateY(0rem) scale(1)' },
    to: [{ transform: 'translateY(15rem) scale(0.5)' }, { transform: 'translateY(0rem) scale(1)' }],
    duration: 1000,
  });

  return (
    <animated.div className={styles.cardsWrapper} style={isCardsSwap ? swap : undefined}>
      {sortedCardsArr.map((card, index) => {
        const isPlayable = isCardPlayable(cardOnTop, card) && isPlayerTurn;
        return (
          <div className={styles.cardWrapper} key={card.cardId}>
            <img
              onLoad={() => {
                setIsLoaded(true);
              }}
              aria-hidden
              onClick={(e) => cardPlayHandler(e, isPlayable, card.cardId, card.value)}
              style={{
                transform: `translate(-50%, var(--card-y)) rotate(${
                  -offset + increment * (index + 1)
                }deg)`,
              }}
              className={classNames(styles.myCard, {
                [styles.active]: isPlayable,
                [styles.loaded]: isLoaded,
              })}
              src={card.value === '8' ? eightCardImage : card.image}
              alt="Card"
            />
          </div>
        );
      })}
    </animated.div>
  );
};
