'use client';
import clsx from 'clsx';
import styles from './index.module.scss';
import Tag from './tag';

const vertically = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontally = [1, 2, 3, 4];

export default function Item() {
  return (
    <main className={styles.item}>
      {horizontally.map(h => (
        <ul key={h}>
          {vertically.map(v => {
            if (h === 3 || h === 4) {
              return (
                <li
                  key={v}
                  className={clsx({
                    'justify-start': h === 4,
                    'justify-end': h === 3,
                  })}
                >
                  <Tag
                    deg={h === 4 ? 90 : 0}
                    className={clsx({ 'scale-x-[-1]': v % 2 === 0 })}
                  />
                </li>
              );
            }
            return <li key={v}></li>;
          })}
        </ul>
      ))}
      <hr className="rotate-[48.6deg] border-[#000] absolute top-[7vh] left-[15.3125vh] w-[18.602755172285637vh]" />
      <hr className="rotate-[131.4deg] border-[#000] absolute top-[7vh] left-[15.3125vh] w-[18.602755172285637vh]" />
    </main>
  );
}
