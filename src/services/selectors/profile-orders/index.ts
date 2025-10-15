import type { RootState } from '@store';

export const selectProfileOrders = (s: RootState) => s.profileOrders.orders;
export const selectProfileOrdersRequest = (s: RootState) =>
  s.profileOrders.request;
export const selectProfileOrdersError = (s: RootState) => s.profileOrders.error;
