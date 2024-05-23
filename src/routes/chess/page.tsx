import styles from './index.module.scss';
import ChessPieces from '@/core/chess-pieces';
import Chessboard from '@/components/chessboard';

export default function Page() {
  return (
    <div className={styles.chess}>
      <ChessPieces />
      <Chessboard />
    </div>
  );
}
