import { useState, useEffect } from 'react';
import styles from './checkBox.module.css';

interface CheckBoxProps {
  isOn: boolean;
  onChange: (value: boolean) => void;
}
export const CheckBox = ({ isOn, onChange }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isOn);

  const onClickHandler = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  return (
    <div className={styles.slider}>
      <label className={isChecked ? styles.label : `${styles.label} ${styles.off}`}>
        <input
          onChange={onClickHandler}
          className={styles.input}
          defaultChecked={isChecked}
          type="checkbox"
        />
      </label>
    </div>
  );
};
