import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { commonSlice } from './common';
import { eventsSlice } from './events';
import { levelsSlice } from './levels';
import { ticketsSlice } from './tickets';

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    auth: authSlice.reducer,
    events: eventsSlice.reducer,
    levels: levelsSlice.reducer,
    tickets: ticketsSlice.reducer,
  },
});