import style from './textInput.module.css';

interface TextInputProps {
  placeholder: string;
}

export const TextInput = ({ placeholder }: TextInputProps) => {
  return <input className={style.input} type="text" placeholder={placeholder} />;
};
