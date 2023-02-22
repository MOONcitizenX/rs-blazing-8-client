import styles from './UserConnect.module.css';
import { TextInput } from '../../basicComponents/textInput';
import { Button } from '../../basicComponents/button';
import { Form } from '../../basicComponents/form';
import { useRoomState } from '../../../store/roomStore';

interface UserConnectProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  roomIdHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  roomId: string;
  isUserName: boolean;
}

export const UserConnect = ({ onSubmit, roomIdHandler, roomId, isUserName }: UserConnectProps) => {
  const error = useRoomState((state) => state.error);
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
      <Button attributes={{ disabled: isUserName || (!isUserName && !!error), type: 'submit' }}>
        Join
      </Button>
    </Form>
  );
};
