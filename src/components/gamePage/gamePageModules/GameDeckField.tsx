import classNames from 'classnames';
import { useState } from 'react';
import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import { cardMap } from '../../../utils/cardsMap';
import styles from './GameDeckField.module.css';

interface GameDeckFieldProps {
  cardTakeHandler: () => void;
}
export const GameDeckField = ({ cardTakeHandler }: GameDeckFieldProps) => {
  const [isCardTacken, setIsCardTacken] = useState<boolean>(false);
  const cardBack = usePlayerState((state) => state.cardback);
  const topCardValue = useRoomState((state) => state.topCard);
  const topCardData = cardMap[`${topCardValue?.value}${topCardValue?.color}`];

  const cardTakeClick = () => {
    if (!isCardTacken) {
      cardTakeHandler();
    }
    setIsCardTacken(true);
  };
  return (
    <div className={styles.deckFieldBorder}>
      <div className={styles.deckField}>
        <img
          aria-hidden
          onClick={cardTakeClick}
          className={classNames(styles.deck, { [styles.disabled]: isCardTacken })}
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
