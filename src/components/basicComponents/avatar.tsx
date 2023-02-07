import React, { useState } from 'react';
import styles from './avatar.module.css';

interface AvatarProps {
  attributes: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
}
export const Avatar = ({ attributes }: AvatarProps) => {
  const { alt, src } = attributes;
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  return (
    <div className={styles.avatar__bg}>
      <img className={styles.avatar} alt={alt || 'user avatar'} src={imgSrc} />
    </div>
  );
};
