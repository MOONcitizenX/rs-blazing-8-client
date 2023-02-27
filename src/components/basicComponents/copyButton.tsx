import classNames from 'classnames';
import { useState } from 'react';
import style from './copyButton.module.css';
import copyIcon from '../../assets/icons/copy.svg';
import doneIcon from '../../assets/icons/check.svg';

interface CopyButtonProps {
  copyText: string;
}

export const CopyButton = ({ copyText }: CopyButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      type="button"
      className={classNames(style.copy, { [style.active]: isActive })}
      title="Copy room id"
      onClick={() => {
        setIsActive(true);
        navigator.clipboard.writeText(copyText);
        setTimeout(() => {
          setIsActive(false);
        }, 1000);
      }}
    >
      <img className={style.copyIcon} src={copyIcon} alt="Copy button" />
      <img className={style.doneIcon} src={doneIcon} alt="Done button" />
    </button>
  );
};
