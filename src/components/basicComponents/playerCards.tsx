import { animated, useSpring } from '@react-spring/web';
import { IPlayerResponse } from '../../API/types/interfaces/IPlayerResponse';
import style from './playerCards.module.css';
import { usePlayerState } from '../../store/playerStore';
import { useRoomState } from '../../store/roomStore';

interface PlayerCardsProps {
  player: IPlayerResponse;
  index: number;
}

export const PlayerCards = ({ player, index }: PlayerCardsProps) => {
  const { cards, id } = player;
  const cardback = usePlayerState((state) => state.cardback);
  const direction = useRoomState((state) => state.direction);
  const players = useRoomState((state) => state.players);
  const cardsArray = index === 0 ? cards : [...new Array(cards)];
  const topCard = useRoomState((state) => state.topCard);

  const cardsPosition0 = {
    top: 'calc(50% + 38rem)',
    left: 'calc(50% + 0rem)',
  };

  const cardsPosition1 = {
    top: 'calc(50% + -19rem)',
    left: 'calc(50% + -40rem)',
  };

  const cardsPosition2 = {
    top: 'calc(50% + -81rem)',
    left: 'calc(50% + -29rem)',
  };

  const cardsPosition3 = {
    top: 'calc(50% + -81rem)',
    left: 'calc(50% + 29rem)',
  };

  const cardsPosition4 = {
    top: 'calc(50% + -19rem)',
    left: 'calc(50% + 40rem)',
  };

  const positionsArray = [
    cardsPosition0,
    cardsPosition1,
    cardsPosition2,
    cardsPosition3,
    cardsPosition4,
  ];

  const swap = useSpring({
    from: positionsArray[index],
    to:
      direction === 'CW'
        ? positionsArray[index === players.length - 1 ? 0 : index + 1]
        : positionsArray[index === 0 ? players.length - 1 : index - 1],

    duration: 1000,
  });

  // TODO cancel animation on end
  // TODO check if swap is laid out - change 'style' in animated.div

  return (
    <animated.div
      className={[style.playerCards, style[`player-cards-${index}`]].join(' ')}
      style={topCard?.value === 'swap' ? swap : undefined}
    >
      {cardsArray.map((_, i) => {
        const count = index === 0 ? cards.length : +cards;
        const angle = 100;
        const offset = angle / 2;
        const increment = angle / (count + 1);

        return (
          <img
            key={`${id}-${i + 1}`}
            className={style.playerCard}
            style={{
              transform: `translate(-50%, -50%) rotate(${-offset + increment * (i + 1)}deg)`,
            }}
            src={cardback}
            alt="Card"
          />
        );
      })}
    </animated.div>
  );
};
