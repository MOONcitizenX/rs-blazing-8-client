import style from './button.module.css';

interface ButtonProps {
  buttonText: string;
}

export const Button = ({ buttonText }: ButtonProps) => {
  return (
    <button className={style.button} type="submit">
      {buttonText}
    </button>
  );
};
