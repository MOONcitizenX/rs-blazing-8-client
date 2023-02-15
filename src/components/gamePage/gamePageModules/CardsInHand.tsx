import classNames from 'classnames';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { useRoomState } from '../../../store/roomStore';
import { ICard } from '../../../store/types/interfaces/ICard';
import styles from './CardsInHand.module.css';

interface CardsInHandProps {
  cardsInHand: ICard[];
  isPlayerTurn: boolean;
  socket: Socket<ClientToServerEvents>;
  cardWasPlayed: () => void;
}
export const CardsInHand = ({
  socket,
  cardsInHand,
  isPlayerTurn,
  cardWasPlayed,
}: CardsInHandProps) => {
  const cardOnTop = useRoomState((state) => state.topCard);
  const count = cardsInHand.length;
  const angle = 35;
  const offset = angle / 2;
  const increment = angle / (count + 1);

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
      cardWasPlayed();
      if (cardValue === '8') {
        socket.emit('choose-color');
        return;
      }
      socket.emit('play-card', { card: cardId });
      if (cardValue === 'swap') {
        // TODO swap animations
      }
    }
  };

  return (
    <div className={styles.cardsWrapper}>
      {cardsInHand.map((card, index) => {
        const isPlayable = isCardPlayable(cardOnTop, card) && isPlayerTurn;
        return (
          <div className={styles.cardWrapper} key={`${card.value}-${card.color}`}>
            <img
              aria-hidden
              onClick={(e) => cardPlayHandler(e, isPlayable, card.cardId, card.value)}
              style={{
                transform: `translate(-50%, -50%) rotate(${-offset + increment * index}deg)`,
              }}
              className={classNames(styles.myCard, { [styles.active]: isPlayable })}
              src={card.image}
              alt="Card"
            />
          </div>
        );
      })}
    </div>
  );
};
