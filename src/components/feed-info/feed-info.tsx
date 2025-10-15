import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '@store';
import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday
} from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);

  const total: number = useSelector(selectFeedTotal);
  const totalToday: number = useSelector(selectFeedTotalToday);
  const feed = { total, totalToday };

  const readyOrders: number[] = getOrders(orders, 'done');
  const pendingOrders: number[] = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
