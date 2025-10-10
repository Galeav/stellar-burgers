import { ReactNode } from 'react';
import styles from './app-layout.module.css';

import { AppHeader } from '@components';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className={styles.root}>
    <AppHeader />
    {children}
  </div>
);
