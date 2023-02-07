import { TextInput } from '../basicComponents/textInput';
import { Button } from '../basicComponents/button';
import style from './StartPage.module.css';

export const StartPage = () => {
  return (
    <div className={style.startPageWrapper}>
      <div className={style.tableWrapper}>
        <div className={style.startTable}>
          <div className={style.separator}>OR</div>
          <div className={style.form}>
            <TextInput attributes={{ placeholder: 'Room ID' }} />
            <Button attributes={{}}>Join</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
