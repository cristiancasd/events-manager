import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const ticketUsersSlice = createSlice({
  name: 'ticketUsers',
  initialState: {
    ticketUsers: [],
    ticketUser: undefined,
    ticketUsersStatus: {
      ticketUser: variableStatus.initial,
      ticketUsers: variableStatus.initial,
    },
  },
  reducers: {
    resetTicketUsersVariables: (state) => {
      (state.ticketUsers = []),
        (state.ticketUser = undefined),
        (state.ticketUsersStatus = {
          ticketUser: variableStatus.initial,
          ticketUsers: variableStatus.initial,
        });
    },

    setTicketUsersStatus: (state, { payload }) => {
      const { ticketUser, ticketUsers } = payload;
      if (ticketUser) state.ticketUsersStatus.ticketUser = ticketUser;
      if (ticketUsers) state.ticketUsersStatus.ticketUsers = ticketUsers;
    },

    setTicketUser: (state, { payload }) => {
      state.ticketUser = payload;
    },

    setTicketUsers: (state, { payload }) => {
      state.ticketUsers = payload;
    },
    addTicketUser: (state, { payload }) => {
      const newArray = [...state.ticketUsers, payload];
      state.ticketUsers = newArray;
    },
    editTicketUserById: (state, { payload }) => {
      const newArray = state.ticketUsers.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.ticketUsers = newArray;
    },
  },
});

export const {
  resetTicketUsersVariables,
  setTicketUsersStatus,
  setTicketUsers,
  addTicketUser,
  editTicketUserById,
  setTicketUser,
} = ticketUsersSlice.actions;
