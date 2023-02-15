import { Socket } from 'socket.io-client';
import styles from './SuitChoosePopUp.module.css';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { CardColor } from '../../../store/types/types/CardColor';
import blueIcon from '../../../assets/icons/blue.png';
import greenIcon from '../../../assets/icons/green.png';
import redIcon from '../../../assets/icons/red.png';
import yellowIcon from '../../../assets/icons/yellow.png';
import { useRoomState } from '../../../store/roomStore';

export interface IIconsArr {
  icon: string;
  suit: CardColor;
}
export const cardsIconsDataArr: IIconsArr[] = [
  { icon: blueIcon, suit: 'B' },
  { icon: greenIcon, suit: 'G' },
  { icon: redIcon, suit: 'R' },
  { icon: yellowIcon, suit: 'Y' },
];

interface SuitChoosePopUpProps {
  socket: Socket<ClientToServerEvents>;
}
export const SuitChoosePopUp = ({ socket }: SuitChoosePopUpProps) => {
  const setIsCardSuitChoose = useRoomState((state) => state.setIsCardSuitChoose);
  const suitChangeHandler = (e: React.MouseEvent<HTMLImageElement>, suit: CardColor) => {
    socket.emit('play-card', { card: `8${suit}` });
    setIsCardSuitChoose(false);
  };
  return (
    <div className={styles.chooseSuitWrapper}>
      <div className={styles.chooseSuit}>
        <div className={styles.transitionsItem}>
          <div className={styles.top}>
            <img
              aria-hidden
              onClick={(e) => suitChangeHandler(e, cardsIconsDataArr[0].suit)}
              className={styles.cardElement}
              src={cardsIconsDataArr[0].icon}
              alt="Card color"
            />
          </div>
          <div className={styles.middle}>
            <div>
              <img
                aria-hidden
                onClick={(e) => suitChangeHandler(e, cardsIconsDataArr[1].suit)}
                className={styles.cardElement}
                src={cardsIconsDataArr[1].icon}
                alt="Card color"
              />
            </div>
            <div>
              <img
                aria-hidden
                onClick={(e) => suitChangeHandler(e, cardsIconsDataArr[2].suit)}
                className={styles.cardElement}
                src={cardsIconsDataArr[2].icon}
                alt="Card color"
              />
            </div>
          </div>
          <div className={styles.bottom}>
            <img
              aria-hidden
              onClick={(e) => suitChangeHandler(e, cardsIconsDataArr[3].suit)}
              className={styles.cardElement}
              src={cardsIconsDataArr[3].icon}
              alt="Card color"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
