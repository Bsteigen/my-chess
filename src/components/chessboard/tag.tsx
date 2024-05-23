import clsx from 'clsx';
import styles from './index.module.scss';

export default function Tag(props: { deg?: number; className?: string }) {
  const { deg, className } = props;
  return (
    <div className={clsx(styles.tag_wrap, className)}>
      <div
        className={clsx([styles.tag], {
          'rotate-90': deg === 90,
        })}
      />
    </div>
  );
}
