import { useState, useEffect } from 'react';
import styles from './checkBox.module.css';

interface CheckBoxProps {
  isOn: boolean;
  onChange: (value: boolean) => void;
}
export const CheckBox = ({ isOn, onChange }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isOn);

  const onClickHandler = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <label className={isChecked ? styles.label : `${styles.label} ${styles.off}`}>
      <input
        onChange={onClickHandler}
        className={styles.input}
        defaultChecked={isChecked}
        type="checkbox"
      />
      <span className={styles.slider} />
    </label>
  );
};
