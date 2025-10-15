import type { RootState } from '@store';

export const selectOrderRequest = (s: RootState) => s.order.request;
export const selectOrderModal = (s: RootState) => s.order.modal;
export const selectOrderError = (s: RootState) => s.order.error;
