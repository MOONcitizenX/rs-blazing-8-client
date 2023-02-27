import { useSpring, animated } from '@react-spring/web';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { usePlayerState } from '../../../store/playerStore';
import { useRoomState } from '../../../store/roomStore';
import { SoundPlayer } from '../../../utils/SoundPlayer';
import styles from './GameDeckField.module.css';
import { LayCardAnimation } from './LayCardAnimation';
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
  const isSoundOn = usePlayerState((state) => state.sound);
  const isCardSuitChoose = useRoomState((state) => state.isCardSuitChoose);
  const cardBack = usePlayerState((state) => state.cardback);
  const topCard = useRoomState((state) => state.topCard);
  const isSuitChooseAnimation = isCardSuitChoose && !isPlayerTurn;
  const isSuitChoosePopUp = isCardSuitChoose && isPlayerTurn;
  const player = SoundPlayer.getInstance();
  const cardsQuantity = useRoomState((state) => state.closedDeck);
  const status = useRoomState((state) => state.status);
  const isLastCard = cardsQuantity === 0;
  const setIsCardSuitChoose = useRoomState((state) => state.setIsCardSuitChoose);
  const playerTurn = useRoomState((state) => state.playerTurn);
  const [isTopCardChanged, setIsTopCardChanged] = useState(false);
  const [topCardImage, setTopCardImage] = useState<string>(cardBack);

  const cardTakeClick = () => {
    if (!isCardTaken) {
      if (isSoundOn) player.play('playCard');
      cardTakeHandler();
    }
  };

  useEffect(() => {
    setIsCardSuitChoose(false);
  }, [playerTurn, setIsCardSuitChoose]);

  useEffect(() => {
    setTimeout(() => {
      if (topCard) {
        setTopCardImage(topCard.image);
      }
      setIsTopCardChanged(true);
    }, 900);

    setTimeout(() => {
      setIsTopCardChanged(false);
    }, 1500);
  }, [topCard]);

  const deckToTop = useSpring({
    from: {
      transform: 'translateX(0)',
      opacity: 1,
      zIndex: 10,
    },
    to: {
      transform: `translateX(15rem)`,
      opacity: 1,
      zIndex: -1,
    },

    duration: 500,
  });

  return (
    <div className={styles.deckFieldBorder}>
      <div className={styles.deckField}>
        {isSuitChooseAnimation && <SuitChoosePopUp isAnimationOn={isSuitChooseAnimation} />}
        {isSuitChoosePopUp && <SuitChoosePopUp socket={socket} />}
        <img
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
        <animated.img
          aria-hidden
          className={styles.deckTopCard}
          style={status === 'playing' ? deckToTop : undefined}
          src={topCardImage}
          alt="deck"
        />
        <LayCardAnimation condition={isTopCardChanged} />
        <img className={styles.card} src={topCardImage} alt="card" />
      </div>
    </div>
  );
};
