import classNames from 'classnames';
import styles from './SuitChooseAnimation.module.css';
import { cardsIconsDataArr as data } from './SuitChoosePopUp';

export const SuitChooseAnimation = () => {
  return (
    <div className={styles.chooseAnimationWrapper}>
      <div className={styles.chooseAnimation}>
        <div className={styles.transitionsItem}>
          {data.map((el) => {
            return (
              <div key={el.suit} className={classNames(styles.suit, styles.pulse)}>
                <img className={styles.cardElement} src={el.icon} alt="Card color" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
