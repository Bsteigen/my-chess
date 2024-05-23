import styles from './index.module.scss';
import Item from './item';

export default function Chessboard() {
  return (
    <main className={styles.chessboard}>
      <section>
        <Item />
      </section>
      <section>
        <span>楚河</span>
        <span>汉界</span>
      </section>
      <section>
        <Item />
      </section>
    </main>
  );
}
