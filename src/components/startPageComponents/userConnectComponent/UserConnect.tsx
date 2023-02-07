import styles from './UserConnect.module.css';
import { TextInput } from '../../basicComponents/textInput';
import { Button } from '../../basicComponents/button';
import { Form } from '../../basicComponents/form';

interface UserConnectProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
// TODO use state for room id, required input and check for wrong inputs
export const UserConnect = ({ onSubmit }: UserConnectProps) => {
  return (
    <Form className={styles.form__connect} onSubmit={onSubmit}>
      <TextInput placeholder="Room ID" />
      <Button buttonText="Join" />
    </Form>
  );
};
