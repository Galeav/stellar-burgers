import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

import { getErrorMessage } from '../../../utils/errors';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  request: boolean;
  error: string | null;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  request: false,
  error: null
};

export const fetchFeeds = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: string }
>('feed/fetch', async (_, { rejectWithValue }) => {
  try {
    return await getFeedsApi();
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось загрузить feed!')
    );
  }
});

const slice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      state.request = true;
      state.error = null;
    });
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.request = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(fetchFeeds.rejected, (state, action) => {
      state.request = false;
      state.error =
        action.payload ?? action.error.message ?? 'Ошибка загрузки feed';
    });
  }
});

export const { clearFeed } = slice.actions;
export const feedReducer = slice.reducer;
