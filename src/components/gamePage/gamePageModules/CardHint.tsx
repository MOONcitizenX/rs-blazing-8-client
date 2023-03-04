import { ICard } from '../../../store/types/interfaces/ICard';
import style from './CardHint.module.css';
import blueIcon from '../../../assets/icons/blue.png';
import greenIcon from '../../../assets/icons/green.png';
import redIcon from '../../../assets/icons/red.png';
import yellowIcon from '../../../assets/icons/yellow.png';

const getColorIcon = (color: string) => {
  if (color === 'B') return blueIcon;
  if (color === 'G') return greenIcon;
  if (color === 'R') return redIcon;
  return yellowIcon;
};

interface CardHintProps {
  card: ICard;
}

export const CardHint = ({ card }: CardHintProps) => {
  const { value, color } = card;
  if (card !== null) {
    return (
      <div className={style.cardHint}>
        <div className={style.value}>{value}</div>
        <div>OR</div>
        <img className={style.color} src={getColorIcon(color)} alt="Card color" />
      </div>
    );
  }
  return null;
};
