import { useEffect, useRef } from 'react';
import { ICard } from '../../../store/types/interfaces/ICard';
import s from './MyCardAnimated.module.css';

interface MyCardAnimatedProps {
  card: ICard;
  coords: {
    closedDeckX: number;
    closedDeckY: number;
    myHandX: number;
    myHandY: number;
  };
  cb: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MyCardAnimated = ({ card, coords, cb }: MyCardAnimatedProps) => {
  const eightCardImage = 'https://raw.githubusercontent.com/mkoroleva5/blazing-8s-cards/main/8.png';

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myCardAnimation = [
      {
        left: `${coords.closedDeckX}px`,
        top: `${coords.closedDeckY}px`,
        opacity: 1,
        visibility: 'visible',
        zIndex: 2,
      },
      {
        left: `${coords.myHandX}px`,
        top: `calc(${coords.myHandY}px - 5%)`,
        opacity: 0.7,
        visibility: 'hidden',
        zIndex: 2,
      },
    ];
    const cardToDraw = cardRef.current;
    if (cardToDraw) {
      cardToDraw.animate(myCardAnimation, {
        id: 'myCardAnimate',
        duration: 500,
        iterations: 1,
      });
    }

    const resetIsMyCardDraw = () => cb(null);

    window.addEventListener('animationend', resetIsMyCardDraw);

    return window.removeEventListener('animationend', resetIsMyCardDraw);
  }, [coords.closedDeckX, coords.closedDeckY, coords.myHandX, coords.myHandY, card, cb]);

  return card ? (
    <div ref={cardRef} className={s.cardWrapper}>
      <img
        className={s.myCard}
        src={card.value === '8' ? eightCardImage : card.image}
        alt="Card"
        loading="lazy"
      />
    </div>
  ) : null;
};
