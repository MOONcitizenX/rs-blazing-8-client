import style from './tableArrows.module.css';
import arrow from '../../assets/images/arrow.png';
import { useRoomState } from '../../store/roomStore';

export const TableArrows = () => {
  const direction = useRoomState((state) => state.direction);
  const angles = [-109, -70, -23, 19, 74, 113];

  const changeDirection = useRoomState((state) => state.changeDirection);

  return (
    <button
      type="button"
      className={style.arrowsWrapper}
      onClick={() => {
        changeDirection('ACW');
      }}
    >
      {angles.map((el) => {
        return (
          <img
            key={el}
            style={
              direction === 'CW'
                ? { transform: `rotate(${el}deg)` }
                : { transform: `rotate(${el - 540}deg)` }
            }
            className={style.arrow}
            src={arrow}
            alt="Direction"
          />
        );
      })}
    </button>
  );
};
