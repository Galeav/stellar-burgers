import React, { FC } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to='/' className={clsx(styles.link, 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </div>
          )}
        </NavLink>
        <NavLink to='/feed' className={clsx(styles.link, 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </div>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to='/profile' className={clsx(styles.link, 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
