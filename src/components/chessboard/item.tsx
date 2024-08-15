import clsx from 'clsx';
import { useSize } from 'ahooks';
import { useMemo } from 'react';
import styles from './index.module.scss';
import Tag from './tag';

const vertically = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontally = [1, 2, 3, 4];

export default function Item() {
  const windowSize = useSize(window.document.documentElement);
  const size = useMemo(
    () => ((windowSize?.height || 0) / 100) * 16,
    [windowSize?.height],
  );
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
      <div>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points={`${size},0 0,${size}`}
            fill="none"
            stroke="#000000"
          />
        </svg>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points={`0,0 ${size},${size}`}
            fill="none"
            stroke="#000000"
          />
        </svg>
      </div>
    </main>
  );
}
