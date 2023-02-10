import { usePlayerState } from '../../store/playerStore';
import style from './button.module.css';

interface ButtonProps {
  attributes: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children?: React.ReactNode;
}

export const Button = ({ attributes, children }: ButtonProps) => {
  const { onClick, className, type, disabled } = attributes;
  const player = usePlayerState((state) => state.soundPlayer);
  const isSoundEffect = usePlayerState((state) => state.sound);
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSoundEffect) player.play('click');
    if (e && onClick) {
      onClick(e);
    }
  };
  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className={className ? `${style.button} ${className}` : style.button}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
