import { createSlice } from '@reduxjs/toolkit';

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
    
  },
});

export const { setEventViewSelected, setNextEvent, setEvents } = eventsSlice.actions;
