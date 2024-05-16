import { createSlice } from '@reduxjs/toolkit';
import { eventsStatus } from '../../shared';

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    ticketsStatus: {
      ticket: eventsStatus.initial,
      tickets: eventsStatus.initial,
    }
  },
  reducers: {
    setTicketsStatus: (state,{payload})=>{
      const {ticket, tickets}=payload;
      if(ticket) state.ticketsStatus.ticket=ticket;
      if(tickets) state.ticketsStatus.tickets=tickets;
    },

    setTickets: (state, { payload }) => {
      state.tickets = payload;
    },
    addTicket: (state, { payload }) => {
      const newArray= [...state.tickets, ...payload];
      state.tickets = newArray;
    }, 
    editticketById: (state, { payload }) => {
      const newArray= state.tickets.map((data)=>{
        if(data.id==payload[0].id) return payload[0]
        return data;
      });
      state.tickets = newArray;
    }, 
  },
});

export const { setTicketsStatus, setTickets, addTicket, editticketById } = ticketsSlice.actions;
