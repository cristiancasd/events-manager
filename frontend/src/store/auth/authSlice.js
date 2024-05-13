import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user: undefined,
    errorMessageAuth: undefined,
  },
  reducers: {
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessageAuth = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = undefined;
      state.errorMessageAuth = payload;
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
      state.user = undefined;
      state.errorMessageAuth = undefined;
    },

    setErrorMessageAuth: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = undefined;
      state.errorMessageAuth = payload;
    },
  },
});

export const { onLogin, onLogout, checkingCredentials, setErrorMessageAuth } = authSlice.actions;
