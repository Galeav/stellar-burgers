import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TUser } from '@utils-types';
import { TLoginData, TRegisterData } from '@api';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi
} from '@api';

import { setCookie, deleteCookie } from '../../../utils/cookie';
import { getErrorMessage } from '../../../utils/errors';

type UserState = {
  user: TUser | null;
  isAuth: boolean;
  isAuthChecked: boolean;
  error: string | null;
  request: boolean;
};

const initialState: UserState = {
  user: null,
  isAuth: false,
  isAuthChecked: false,
  error: null,
  request: false
};

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, `Валидация не удалась`));
    }
  }
);

export const login = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('user/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(payload);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Авторизация не удалась'));
  }
});

export const register = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(payload);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Регистрация не удалась'));
  }
});

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/update', async (payload, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(payload);
    return response.user;
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Обновление данных не удалось')
    );
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Выход не удался'));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.error = null;
      state.isAuthChecked = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isAuthChecked = true;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null;
      state.isAuth = false;
      state.isAuthChecked = true;
    });

    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
      state.request = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload ?? action.error.message ?? 'Ошибка входа';
      state.request = false;
    });

    builder.addCase(register.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
      state.request = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error =
        action.payload ?? action.error.message ?? 'Ошибка регистрации';
      state.request = false;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.request = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error =
        action.payload ?? action.error.message ?? 'Ошибка обновления профиля';
      state.request = false;
    });

    builder.addCase(logout.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuth = false;
      state.error = null;
      state.request = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload ?? action.error.message ?? 'Ошибка выхода';
      state.request = false;
    });
  }
});

export const { clearAuthError } = userSlice.actions;
export const authReducer = userSlice.reducer;
