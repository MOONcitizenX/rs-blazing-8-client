import styles from './UserConnect.module.css';
import { TextInput } from '../../basicComponents/textInput';
import { Button } from '../../basicComponents/button';
import { Form } from '../../basicComponents/form';

interface UserConnectProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  roomIdHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roomId: string;
}
// TODO use state for room id, required input and check for wrong inputs
export const UserConnect = ({ onSubmit, roomIdHandler, roomId }: UserConnectProps) => {
  return (
    <Form className={styles.form__connect} onSubmit={onSubmit}>
      <TextInput
        attributes={{
          onChange: roomIdHandler,
          value: roomId,
          required: true,
          placeholder: 'Room ID',
        }}
      />
      <Button attributes={{ type: 'submit' }}>Join</Button>
    </Form>
  );
};
