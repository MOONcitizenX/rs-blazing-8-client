import classNames from 'classnames';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import { cardMap } from '../../../utils/cardsMap';
import styles from './GameDeckField.module.css';
import { SuitChooseAnimation } from './SuitChooseAnimation';
import { SuitChoosePopUp } from './SuitChoosePopUp';

interface GameDeckFieldProps {
  cardTakeHandler: () => void;
  socket: Socket<ClientToServerEvents>;
  isPlayerTurn: boolean;
  isCardTaken: boolean;
}
export const GameDeckField = ({
  socket,
  cardTakeHandler,
  isPlayerTurn,
  isCardTaken,
}: GameDeckFieldProps) => {
  const isCardSuitChoose = useRoomState((state) => state.isCardSuitChoose);
  const cardBack = usePlayerState((state) => state.cardback);
  const topCardValue = useRoomState((state) => state.topCard);
  const topCardData = cardMap[`${topCardValue?.value}${topCardValue?.color}`];
  const isSuitChooseAnimation = isCardSuitChoose && !isPlayerTurn;
  const isSuitChoosePopUp = isCardSuitChoose && isPlayerTurn;

  const cardTakeClick = () => {
    if (!isCardTaken) {
      cardTakeHandler();
    }
  };

  return (
    <div className={styles.deckFieldBorder}>
      <div className={styles.deckField}>
        {isSuitChooseAnimation && <SuitChooseAnimation />}
        {isSuitChoosePopUp && <SuitChoosePopUp />}
        <img
          aria-hidden
          onClick={cardTakeClick}
          className={classNames(
            styles.deck,
            { [styles.disabled]: isCardTaken },
            { [styles.disabled]: !isPlayerTurn },
          )}
          src={cardBack}
          alt="deck"
        />
        <img className={styles.card} src={topCardData.image} alt="card" />
      </div>
    </div>
  );
};
