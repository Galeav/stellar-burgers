import type { RootState } from '@store';

export const selectIngredients = (s: RootState) => s.ingredients.items;
export const selectIngredientsRequest = (s: RootState) => s.ingredients.request;
export const selectIngredientsError = (s: RootState) => s.ingredients.error;
