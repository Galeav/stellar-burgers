import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';

import { getErrorMessage } from '../../../utils/errors';

type OrderViewState = {
  current: TOrder | null;
  request: boolean;
  error: string | null;
};

const initialState: OrderViewState = {
  current: null,
  request: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderView/fetchByNumber', async (num, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(num);
    const first = response.orders?.[0];
    if (!first) {
      return rejectWithValue('Заказ не найден');
    }
    return first;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Не удалось получить заказ'));
  }
});

const slice = createSlice({
  name: 'orderView',
  initialState,
  reducers: {
    clearOrderView(state) {
      state.current = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderByNumber.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(fetchOrderByNumber.fulfilled, (state, action) => {
      state.request = false;
      state.current = action.payload;
    });
    builder.addCase(fetchOrderByNumber.rejected, (state, action) => {
      state.request = false;
      state.error =
        action.payload ?? action.error.message ?? 'Ошибка загрузки заказа';
    });
  }
});

export const { clearOrderView } = slice.actions;
export const orderViewReducer = slice.reducer;
