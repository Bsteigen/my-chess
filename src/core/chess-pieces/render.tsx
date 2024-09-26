import clsx from 'clsx';
import styles from './index.module.scss';
import { IRenderChessPieceProps } from '@/types/interface';
import { EChessCamp } from '@/types/enum/chess';

export default function Render(props: IRenderChessPieceProps) {
  const { children, size = 5, x = 0, y = 0, camp, checked, onSelected } = props;
  const style = {
    width: `${size}vh`,
    height: `${size}vh`,
    left: `${x * fixedLength - size / 2}vh`,
    top: `${y * fixedLength - size / 2}vh`,
  };
  return (
    <div
      style={style}
      onClick={onSelected}
      className={clsx(styles.chess_pieces_wrap, {
        [styles.camp_chu]: camp === EChessCamp.chu,
        [styles.camp_han]: camp === EChessCamp.han,
        [styles.selected]: checked,
        'rotate-180': camp === EChessCamp.han
      })}
    >
      <div className="pointer-events-none">{children}</div>
    </div>
  );
}

export const fixedLength = 8;
