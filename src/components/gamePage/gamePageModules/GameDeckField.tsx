import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import { cardMap } from '../../../utils/cardsMap';
import styles from './GameDeckField.module.css';

interface GameDeckFieldProps {
  cardTakeHandler: () => void;
}
export const GameDeckField = ({ cardTakeHandler }: GameDeckFieldProps) => {
  const cardBack = usePlayerState((state) => state.cardback);
  const topCardValue = useRoomState((state) => state.topCard);
  const topCardData = cardMap[`${topCardValue?.value}${topCardValue?.color}`];
  return (
    <div className={styles.deckFieldBorder}>
      <div className={styles.deckField}>
        <img
          aria-hidden
          onClick={cardTakeHandler}
          className={styles.deck}
          src={cardBack}
          alt="deck"
        />
        <img
          className={styles.card}
          src={topCardData.image ? topCardData.image : 'data'}
          alt="card"
        />
      </div>
    </div>
  );
};
