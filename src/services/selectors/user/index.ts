import type { RootState } from '@store';

export const selectUser = (s: RootState) => s.auth.user;
export const selectIsAuth = (s: RootState) => s.auth.isAuth;
export const selectIsAuthChecked = (s: RootState) => s.auth.isAuthChecked;
export const selectAuthError = (s: RootState) => s.auth.error;
export const selectAuthRequest = (s: RootState) => s.auth.request;
