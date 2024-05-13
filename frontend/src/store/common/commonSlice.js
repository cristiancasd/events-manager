import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    errorMessage: undefined,
    successMessage: undefined,
    isFetching: false,
  },
  reducers: {
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setSuccessMessage: (state, { payload }) => {
      state.successMessage = payload;
    },
    setIsFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
  },
});

export const { setErrorMessage, setSuccessMessage, setIsFetching } = commonSlice.actions;
