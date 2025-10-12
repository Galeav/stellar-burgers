import { FC, useCallback, useEffect } from 'react';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '@store';
import { selectFeedRequest, selectFeedOrders } from '@selectors';
import { clearFeed, fetchFeeds } from '@slices';

const intervalMs = 30000; // ms

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedRequest);

  // первоначальная загрузка
  useEffect(() => {
    if (!orders.length && !isLoading) dispatch(fetchFeeds());
  }, [dispatch, orders.length, isLoading]);

  // реальное время (рефетчи каждые intervalMS)
  useEffect(() => {
    const tick = () => {
      if (!document.hidden && !isLoading) {
        dispatch(fetchFeeds());
      }
    };
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [dispatch]);

  // при переходе в окно
  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden && !isLoading) {
        dispatch(fetchFeeds());
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [dispatch, isLoading]);

  // по запросу (кнопка "обновить")
  const handleGetFeeds = useCallback(() => {
    if (!isLoading) {
      dispatch(clearFeed());
      dispatch(fetchFeeds());
    }
  }, [dispatch, isLoading]);

  if (isLoading && !orders.length) return <Preloader />;

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
