import style from './LayCardAnimation.module.css';

import dustGif1 from '../../../assets/images/dust1.gif';
import dustGif2 from '../../../assets/images/dust2.gif';

interface LayCardAnimationProps {
  condition: boolean;
}

export const LayCardAnimation = ({ condition }: LayCardAnimationProps) => {
  return (
    <div
      className={style.dustWrapper}
      style={condition ? { display: 'block' } : { display: 'none' }}
    >
      <img className={style.dust1} src={dustGif1} alt="card" />
      <img className={style.dust2} src={dustGif2} alt="card" />
      <img className={style.dust3} src={dustGif1} alt="card" />
      <img className={style.dust4} src={dustGif2} alt="card" />
      <img className={style.dust5} src={dustGif1} alt="card" />
    </div>
  );
};
