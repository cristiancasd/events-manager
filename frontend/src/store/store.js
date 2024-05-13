import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/authSlice';

import { commonSlice } from './common/commonSlice';

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    auth: authSlice.reducer,
  },
});
