import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

import { getErrorMessage } from '../../../utils/errors';
import { logout } from '../user';

type ProfileOrdersState = {
  orders: TOrder[];
  request: boolean;
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  request: false,
  error: null
};

export const fetchProfileOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('profileOrders/fetch', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось загрузить заказы')
    );
  }
});

const slice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileOrders.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(fetchProfileOrders.fulfilled, (state, action) => {
      state.request = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchProfileOrders.rejected, (state, action) => {
      state.request = false;
      state.error =
        action.payload ?? action.error.message ?? 'Ошибка загрузки заказов';
    });

    // очищаем на разлогине
    builder.addCase(logout.fulfilled, () => initialState);
  }
});

export const profileOrdersReducer = slice.reducer;
