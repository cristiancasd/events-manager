import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const ticketsProspectFeeSlice = createSlice({
  name: 'ticketsProspectFee',
  initialState: {
    ticketsProspectFee: [],
    ticketsProspectFeeStatus: {
      ticketProspectFee: variableStatus.initial,
      ticketsProspectFee: variableStatus.initial,
    },
  },
  reducers: {
    resetTicketsProspectFeeVariables: (state) => {
      (state.ticketsProspectFee = []),
        (state.ticketsProspectFeeStatus = {
          ticketProspectFee: variableStatus.initial,
          ticketsProspectFee: variableStatus.initial,
        });
    },

    setTicketsProspectFeeStatus: (state, { payload }) => {
      const { ticketProspectFee, ticketsProspectFee } = payload;
      if (ticketProspectFee) state.ticketsProspectFeeStatus.ticketProspectFee = ticketProspectFee;
      if (ticketsProspectFee) state.ticketsProspectFeeStatus.ticketsProspectFee = ticketsProspectFee;
    },

    setTicketsProspectFee: (state, { payload }) => {
      state.ticketsProspectFee = payload;
    },
    addTicketProspectFee: (state, { payload }) => {
      const newArray = [...state.ticketsProspectFee, payload];
      state.ticketsProspectFee = newArray;
    },
    editTicketProspectFeeById: (state, { payload }) => {
      const newArray = state.ticketsProspectFee.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.ticketsProspectFee = newArray;
    },
  },
});

export const { resetTicketsProspectFeeVariables, setTicketsProspectFeeStatus, setTicketsProspectFee, addTicketProspectFee, editTicketProspectFeeById } = ticketsProspectFeeSlice.actions;
