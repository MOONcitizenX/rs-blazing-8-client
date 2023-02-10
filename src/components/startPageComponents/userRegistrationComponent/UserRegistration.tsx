import { TextInput } from '../../basicComponents/textInput';
import { Button } from '../../basicComponents/button';
import styles from './UserRegistration.module.css';
import { Form } from '../../basicComponents/form';

interface UserRegistrationProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userNameHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userName: string;
}
export const UserRegistration = ({
  onSubmit,
  userNameHandler,
  userName,
}: UserRegistrationProps) => {
  return (
    <Form className={styles.form__registration} onSubmit={onSubmit}>
      <TextInput
        attributes={{
          value: userName,
          onChange: userNameHandler,
          required: true,
          placeholder: 'User Name',
        }}
      />
      <Button attributes={{ type: 'submit' }}>Create Room</Button>
    </Form>
  );
};
