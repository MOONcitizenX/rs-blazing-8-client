import classNames from 'classnames';
import { useState } from 'react';
import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import styles from './GameDeckField.module.css';

interface GameDeckFieldProps {
  cardTakeHandler: () => void;
}
export const GameDeckField = ({ cardTakeHandler }: GameDeckFieldProps) => {
  const [isCardTaken, setIsCardTaken] = useState<boolean>(false);
  const cardBack = usePlayerState((state) => state.cardback);
  const topCard = useRoomState((state) => state.topCard);

  const cardTakeClick = () => {
    if (!isCardTaken) {
      cardTakeHandler();
    }
    setIsCardTaken(true);
  };
  return (
    <div className={styles.deckFieldBorder}>
      <div className={styles.deckField}>
        <img
          aria-hidden
          onClick={cardTakeClick}
          className={classNames(styles.deck, { [styles.disabled]: isCardTaken })}
          src={cardBack}
          alt="deck"
        />
        <img className={styles.card} src={topCard?.image || undefined} alt="card" />
      </div>
    </div>
  );
};
