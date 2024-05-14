import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { commonSlice } from './common/commonSlice';
import { eventsSlice } from './events/eventsSlice';

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    auth: authSlice.reducer,
    events: eventsSlice.reducer,
  },
});
