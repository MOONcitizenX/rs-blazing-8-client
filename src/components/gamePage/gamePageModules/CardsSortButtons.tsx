import styles from './CardsSortButtons.module.css';
import { Button } from '../../basicComponents/button';
import { usePlayerState } from '../../../store/playerStore';

export const CardsSortButtons = () => {
  const setCardsSort = usePlayerState((state) => state.changeCardsSort);
  const sortType = usePlayerState((state) => state.cardsSort);
  const toggleValueSort = () => {
    if (sortType === '' || sortType === 'suit') {
      return setCardsSort('value');
    }
    return setCardsSort('');
  };
  const toggleSuitSort = () => {
    if (sortType === '' || sortType === 'value') {
      return setCardsSort('suit');
    }
    return setCardsSort('');
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}> Sort by:</p>
      <Button attributes={{ onClick: toggleValueSort }}>value</Button>
      <Button attributes={{ onClick: toggleSuitSort }}>suit</Button>
    </div>
  );
};
