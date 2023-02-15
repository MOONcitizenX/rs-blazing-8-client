import { Socket } from 'socket.io-client';
import styles from './SuitChoosePopUp.module.css';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { useRoomState } from '../../../store/roomStore';
import { CardColor } from '../../../store/types/types/CardColor';
import blueIcon from '../../../assets/icons/blue.png';
import greenIcon from '../../../assets/icons/green.png';
import redIcon from '../../../assets/icons/red.png';
import yellowIcon from '../../../assets/icons/yellow.png';

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
  const suitChangeHandler = (e: React.MouseEvent<HTMLImageElement>, suit: CardColor) => {
    socket.emit('play-card', { card: `8${suit}` });
  };
  return (
    <div className={styles.chooseSuitWrapper}>
      {cardsIconsDataArr.map((el) => (
        <img
          aria-hidden
          key={el.suit}
          className={styles.chooseSuit}
          src={el.icon}
          onClick={(e) => suitChangeHandler(e, el.suit)}
          alt="Card color"
        />
      ))}
    </div>
  );
};
