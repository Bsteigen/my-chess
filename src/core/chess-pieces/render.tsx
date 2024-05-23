import clsx from 'clsx';
import styles from './index.module.scss';
import { IRenderChessPieceProps } from '@/types/interface';
import { EChessCamp } from '@/types/enum/chess';

export default function Render(props: IRenderChessPieceProps) {
  const {
    children,
    size = 50,
    x = 0,
    y = 0,
    camp,
    checked,
    onSelected,
  } = props;
  const style = {
    width: size,
    height: size,
    left: x * fixedLength - size / 2,
    top: y * fixedLength - size / 2,
  };
  return (
    <div
      style={style}
      onClick={onSelected}
      className={clsx(styles.chess_pieces_wrap, {
        [styles.camp_chu]: camp === EChessCamp.chu,
        [styles.camp_han]: camp === EChessCamp.han,
        [styles.selected]: checked,
      })}
    >
      <span className="pointer-events-none">{children}</span>
    </div>
  );
}

export const fixedLength = 80;
