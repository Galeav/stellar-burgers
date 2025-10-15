import type { RootState } from '@store';

export const selectFeedOrders = (s: RootState) => s.feed.orders;
export const selectFeedRequest = (s: RootState) => s.feed.request;
export const selectFeedTotal = (s: RootState) => s.feed.total;
export const selectFeedTotalToday = (s: RootState) => s.feed.totalToday;
export const selectFeedError = (s: RootState) => s.feed.error;
