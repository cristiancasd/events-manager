import { createSlice } from '@reduxjs/toolkit';

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    errorMessage: undefined,
    successMessage: undefined,
    isFetching: false,
    toGlobalSearch: undefined,
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
    setToGloalSearch: (state, { payload }) => {
      state.toGlobalSearch = payload;
    },
  },
});

export const { setErrorMessage, setSuccessMessage, setIsFetching, setToGloalSearch } = commonSlice.actions;
