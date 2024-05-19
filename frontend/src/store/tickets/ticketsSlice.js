import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    ticketsStatus: {
      ticket: variableStatus.initial,
      tickets: variableStatus.initial,
    },
  },
  reducers: {
    resetTicketsVariables: (state) => {
      (state.tickets = []),
        (state.ticketsStatus = {
          ticket: variableStatus.initial,
          tickets: variableStatus.initial,
        });
    },

    setTicketsStatus: (state, { payload }) => {
      const { ticket, tickets } = payload;
      if (ticket) state.ticketsStatus.ticket = ticket;
      if (tickets) state.ticketsStatus.tickets = tickets;
    },

    setTickets: (state, { payload }) => {
      state.tickets = payload;
    },
    addTicket: (state, { payload }) => {
      const newArray = [...state.tickets, payload];
      state.tickets = newArray;
    },
    editTicketById: (state, { payload }) => {
      const newArray = state.tickets.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.tickets = newArray;
    },
  },
});

export const { resetTicketsVariables, setTicketsStatus, setTickets, addTicket, editTicketById } = ticketsSlice.actions;
