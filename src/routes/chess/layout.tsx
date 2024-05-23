import { Outlet } from '@modern-js/runtime/router';
import styles from './index.module.scss';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
}
