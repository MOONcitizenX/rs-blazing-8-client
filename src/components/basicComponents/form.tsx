import styles from './form.module.css';

interface IFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children?: React.ReactNode;
}
export const Form = ({ onSubmit, children, className }: IFormProps) => {
  return (
    <form className={className ? `${className} ${styles.form}` : styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
