import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import type { RootState } from '@store';

import { getErrorMessage } from '../../../utils/errors';
import { clearConstructor } from '../burger-constructor';
import { fetchProfileOrders } from '../profile-orders';
import { fetchFeeds } from '../feed';

type OrderState = {
  request: boolean;
  error: string | null;
  modal: TOrder | null;
};

const initialState: OrderState = { request: false, error: null, modal: null };

export const placeOrder = createAsyncThunk<
  TOrder,
  void,
  { state: RootState; rejectValue: string }
>('order/place', async (_, { getState, rejectWithValue, dispatch }) => {
  try {
    const { bun, ingredients } = getState().burgerConstructor;
    if (!bun) return rejectWithValue('Не выбрана булка!');
    const ids: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    const response: { order: TOrder; name: string } = await orderBurgerApi(ids);

    dispatch(clearConstructor());
    dispatch(fetchFeeds());
    dispatch(fetchProfileOrders());

    return response.order;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err, 'Не удалось оформить заказ!'));
  }
});

const slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal(state) {
      state.modal = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.request = false;
      state.modal = action.payload;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.request = false;
      state.error =
        action.payload ?? action.error.message ?? 'Ошибка оформления заказа';
    });
  }
});

export const { clearOrderModal } = slice.actions;
export const orderReducer = slice.reducer;
