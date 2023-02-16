import { Socket } from 'socket.io-client';
import styles from './SuitChoosePopUp.module.css';
import { ClientToServerEvents } from '../../../API/types/interfaces/ClientToServerEvents';
import { CardColor } from '../../../store/types/types/CardColor';
import blueIcon from '../../../assets/icons/blue.png';
import greenIcon from '../../../assets/icons/green.png';
import redIcon from '../../../assets/icons/red.png';
import yellowIcon from '../../../assets/icons/yellow.png';
import { useRoomState } from '../../../store/roomStore';
import { usePlayerState } from '../../../store/playerStore';
import { SoundPlayer } from '../../../utils/SoundPlayer';

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
  const isSoundOn = usePlayerState((state) => state.sound);
  const player = new SoundPlayer();
  const setIsCardSuitChoose = useRoomState((state) => state.setIsCardSuitChoose);
  const suitChangeHandler = (e: React.MouseEvent<HTMLImageElement>, suit: CardColor) => {
    if (isSoundOn) player.play('click');
    socket.emit('play-card', { card: `8${suit}` });
    setIsCardSuitChoose(false);
  };
  return (
    <div className={styles.chooseSuitWrapper}>
      <div className={styles.chooseSuit}>
        <div className={styles.transitionsItem}>
          {cardsIconsDataArr.map((el) => {
            return (
              <div key={el.suit} className={styles.suitWrapper}>
                <div className={styles.suit}>
                  <img
                    aria-hidden
                    onClick={(e) => suitChangeHandler(e, el.suit)}
                    className={styles.cardElement}
                    src={el.icon}
                    alt="Card color"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
