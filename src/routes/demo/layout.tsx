import { Outlet } from '@modern-js/runtime/router';
import styles from './index.module.scss';

export default function layout() {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}
