import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import { SoundPlayer } from '../../../utils/SoundPlayer';
import styles from './GameDeckField.module.css';
import { SuitChooseAnimation } from './SuitChooseAnimation';
import { SuitChoosePopUp } from './SuitChoosePopUp';

interface GameDeckFieldProps {
  cardTakeHandler: () => void;
  socket: Socket<ClientToServerEvents>;
  isPlayerTurn: boolean;
  isCardTaken: boolean;
}

const GameDeckField1 = (
  { socket, cardTakeHandler, isPlayerTurn, isCardTaken }: GameDeckFieldProps,
  ref: ForwardedRef<HTMLImageElement>,
) => {
  const isSoundOn = usePlayerState((state) => state.sound);
  const isCardSuitChoose = useRoomState((state) => state.isCardSuitChoose);
  const cardBack = usePlayerState((state) => state.cardback);
  const topCard = useRoomState((state) => state.topCard);
  const isSuitChooseAnimation = isCardSuitChoose && !isPlayerTurn;
  const isSuitChoosePopUp = isCardSuitChoose && isPlayerTurn;
  const player = new SoundPlayer();
  const cardsQuantity = useRoomState((state) => state.closedDeck);
  const isLastCard = cardsQuantity === 0;

  const cardTakeClick = () => {
    if (!isCardTaken) {
      if (isSoundOn) player.play('playCard');
      cardTakeHandler();
    }
  };

  return (
    <div className={styles.deckFieldBorder}>
      <div className={styles.deckField}>
        {isSuitChooseAnimation && <SuitChooseAnimation />}
        {isSuitChoosePopUp && <SuitChoosePopUp socket={socket} />}
        <img
          ref={ref}
          aria-hidden
          onClick={cardTakeClick}
          className={classNames(
            styles.deck,
            { [styles.disabled]: isLastCard },
            { [styles.hidden]: isLastCard },
            { [styles.disabled]: isCardTaken },
            { [styles.disabled]: !isPlayerTurn },
          )}
          src={cardBack}
          alt="deck"
        />
        <img className={styles.card} src={topCard?.image || undefined} alt="card" />
      </div>
    </div>
  );
};

export const GameDeckField = forwardRef(GameDeckField1);
