import styles from './avatar.module.css';

interface AvatarProps {
  attributes: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
}
export const Avatar = ({ attributes }: AvatarProps) => {
  const { alt, src } = attributes;

  return (
    <div className={styles.avatar__bg}>
      <img className={styles.avatar} alt={alt || 'user avatar'} src={src} />
    </div>
  );
};
