import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

import { getErrorMessage } from '../../../utils/errors';
import { RootState } from '@store';

type IngredientsState = {
  items: TIngredient[];
  request: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  items: [],
  request: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { state: RootState; rejectValue: string }
>(
  'ingredients/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, 'Не удалось загрузить список ингредиентов!')
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState().ingredients;
      return !state.request;
    }
  }
);

const slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
      state.request = false;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.request = false;
      state.error = action.payload ?? action.error.message ?? 'Ошибка загрузки';
    });
  }
});

export const ingredientsReducer = slice.reducer;
