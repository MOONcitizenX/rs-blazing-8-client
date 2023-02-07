import React from 'react';
import { TextInput } from '../../basicComponents/textInput';
import { Button } from '../../basicComponents/button';
import styles from './UserRegistration.module.css';
import { Form } from '../../basicComponents/form';

interface UserRegistrationProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const UserRegistration = ({ onSubmit }: UserRegistrationProps) => {
  // TODO use state for userInput, required input
  return (
    <Form className={styles.form__registration} onSubmit={onSubmit}>
      <TextInput placeholder="User Name" />
      <Button buttonText="Create Room" />
    </Form>
  );
};
