import { createSlice } from '@reduxjs/toolkit';
import { findNextEvent } from './utils/findNextEvent';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    nextEvent: undefined,
    events: [],
    eventViewSelected: undefined
  },
  reducers: {
    setEventViewSelected: (state,{payload})=>{
      state.eventsView=payload;
    },
    setNextEvent: (state, { payload }) => {
      state.nextEvent = payload;
    },
    setEvents: (state, { payload }) => {
      state.events = payload;
    },
    addEvent: (state, { payload }) => {
      const newArray= [...state.events, ...payload];
      state.events = newArray;
      state.nextEvent=findNextEvent(newArray);
    }, 
    editEventById: (state, { payload }) => {
      const newArray= state.events.map((data)=>{
        if(data.id==payload[0].id) return payload[0]
        return data;
      });
      state.events = newArray;
      state.nextEvent=findNextEvent(newArray);
    }, 
  },
});

export const { setEventViewSelected, setNextEvent, setEvents, addEvent, editEventById } = eventsSlice.actions;
