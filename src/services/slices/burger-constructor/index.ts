import { v4 as random_uuid } from 'uuid';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient, TConstructorIngredient } from '@utils-types';

import { logout } from '../user';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const slice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients.push({ ...action.payload, id: random_uuid() });
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      // перемещение ингредиента,
      // находящегося в позиции {from} в любую позицию {to} внутри рецепта
      const len = state.ingredients.length;
      if (len < 2) return;

      const { from, to } = action.payload;
      if (from === to || from < 0 || to < 0 || from >= len || to >= len) return;

      const [item] = state.ingredients.splice(from, 1);
      if (!item) return;
      state.ingredients.splice(to, 0, item);
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    // сбрасываем прогресс на разлогине
    builder.addCase(logout.fulfilled, () => initialState);
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = slice.actions;

export const constructorReducer = slice.reducer;
