import { FC, useEffect } from 'react';

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import {
  selectAuthRequest,
  selectIsAuth,
  selectProfileOrders,
  selectProfileOrdersRequest
} from '@selectors';
import { fetchProfileOrders } from '@slices';
import { Preloader } from '@ui';

const intervalMs = 15000; // ms

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersRequest);
  const authRequest = useSelector(selectAuthRequest);
  const isAuth = useSelector(selectIsAuth);

  // первоначальная загрузка
  useEffect(() => {
    if (isAuth && !orders.length && !isLoading) {
      dispatch(fetchProfileOrders());
    }
  }, [dispatch, isAuth, orders.length, isLoading]);

  // реальное время (рефетчи каждые intervalMS)
  useEffect(() => {
    if (!isAuth) return;
    const tick = () => {
      if (!document.hidden && !isLoading && !authRequest) {
        dispatch(fetchProfileOrders());
      }
    };
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [dispatch, isAuth]);

  // при переходе в окно
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden && isAuth && !isLoading && !authRequest) {
        dispatch(fetchProfileOrders());
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [dispatch, isAuth, isLoading, authRequest]);

  // Preloader, когда:
  // 1. isLoading - загружаются заказы
  // 2. authRequest - разлогинивание пользователя (из бокового меню)
  if ((isLoading && !orders.length) || authRequest) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
