import clsx from 'clsx';
import styles from './index.module.scss';
import { IRenderChessPieceProps } from '@/types/interface';
import { EChessCamp, EItemType } from '@/types/enum/chess';

export default function Render(props: IRenderChessPieceProps) {
  const {
    children,
    size = 5,
    x = 0,
    y = 0,
    camp,
    checked,
    id,
    type,
    onSelected,
  } = props;
  const style = {
    width: `${size}vh`,
    height: `${size}vh`,
    left: `${x * (fixedLength - 7 / 8) - size / 2}vh`,
    top: `${y * fixedLength - size / 2}vh`,
  };
  return (
    <div
      style={style}
      id={id}
      onClick={onSelected}
      className={clsx(styles.chess_pieces_wrap, {
        [styles.camp_chu]: camp === EChessCamp.chu,
        [styles.camp_han]: camp === EChessCamp.han,
        [styles.selected]: checked,
        'rotate-180': camp === EChessCamp.han,
      })}
    >
      {type === EItemType.CHESS_PIECE && (
        <div className="pointer-events-none">{children}</div>
      )}
      {type === EItemType.POINT && (
        <div className="w-[1vh] h-[1vh] rounded-[50%] bg-[#f2d12d]" />
      )}
    </div>
  );
}

export const fixedLength = 7;
