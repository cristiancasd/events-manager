import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const ticketProspectsSlice = createSlice({
  name: 'ticketProspects',
  initialState: {
    ticketProspects: [],
    ticketProspect: undefined,
    ticketProspectsStatus: {
      ticketProspect: variableStatus.initial,
      ticketProspects: variableStatus.initial,
    },
  },
  reducers: {
    resetTicketProspectsVariables: (state) => {
      (state.ticketProspects = []),
        (state.ticketProspect = undefined),
        (state.ticketProspectsStatus = {
          ticketProspect: variableStatus.initial,
          ticketProspects: variableStatus.initial,
        });
    },

    setTicketProspectsStatus: (state, { payload }) => {
      const { ticketProspect, ticketProspects } = payload;
      if (ticketProspect) state.ticketProspectsStatus.ticketProspect = ticketProspect;
      if (ticketProspects) state.ticketProspectsStatus.ticketProspects = ticketProspects;
    },

    setTicketProspect: (state, { payload }) => {
      state.ticketProspect = payload;
    },

    setTicketProspects: (state, { payload }) => {
      state.ticketProspects = payload;
    },
    addTicketProspect: (state, { payload }) => {
      const newArray = [...state.ticketProspects, payload];
      state.ticketProspects = newArray;
    },
    editTicketProspectById: (state, { payload }) => {
      const newArray = state.ticketProspects.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.ticketProspects = newArray;
    },
  },
});

export const {
  resetTicketProspectsVariables,
  setTicketProspectsStatus,
  setTicketProspects,
  addTicketProspect,
  editTicketProspectById,
  setTicketProspect,
} = ticketProspectsSlice.actions;
