import style from './tableArrows.module.css';
import arrow from '../../assets/images/arrow.png';

export const TableArrows = () => {
  return (
    <div className={style.arrowsWrapper}>
      <img className={style.arrow} src={arrow} alt="Direction" />
      <img className={style.arrow} src={arrow} alt="Direction" />
      <img className={style.arrow} src={arrow} alt="Direction" />
      <img className={style.arrow} src={arrow} alt="Direction" />
      <img className={style.arrow} src={arrow} alt="Direction" />
      <img className={style.arrow} src={arrow} alt="Direction" />
    </div>
  );
};
