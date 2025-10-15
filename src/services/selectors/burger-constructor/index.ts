import type { RootState } from '@store';

export const selectConstructorItems = (s: RootState) => s.burgerConstructor;
