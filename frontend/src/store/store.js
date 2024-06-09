import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { commonSlice } from './common';
import { eventsSlice } from './events';
import { levelsSlice } from './levels';
import { ticketsSlice } from './tickets';
import { usersSlice } from './users';
import { ticketUsersSlice } from './ticket-user';
import { prospectsSlice } from './prospects';

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    auth: authSlice.reducer,
    events: eventsSlice.reducer,
    levels: levelsSlice.reducer,
    tickets: ticketsSlice.reducer,
    users: usersSlice.reducer,
    ticketUsers: ticketUsersSlice.reducer,
    prospects: prospectsSlice.reducer,
  },
});
