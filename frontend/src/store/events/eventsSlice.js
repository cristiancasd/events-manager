import { variableStatus } from '../../shared';
import { createSlice } from '@reduxjs/toolkit';
import { findNextEvent } from './utils/findNextEvent';

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    nextEvent: undefined,
    events: [],
    eventViewSelected: undefined,
    eventStatus: {
      event: variableStatus.initial,
      events: variableStatus.initial,
    },
  },
  reducers: {
    resetEventsVariables: (state) => {
      state.nextEvent = undefined;
      state.events = [];
      state.eventViewSelected = undefined;
      state.eventStatus = {
        event: variableStatus.initial,
        events: variableStatus.initial,
      };
    },

    setEventStatus: (state, { payload }) => {
      const { event, events } = payload;
      if (event) state.eventStatus.event = event;
      if (events) state.eventStatus.events = events;
    },

    setEventViewSelected: (state, { payload }) => {
      state.eventViewSelected = payload;
    },
    setNextEvent: (state, { payload }) => {
      state.nextEvent = payload;
    },
    setEvents: (state, { payload }) => {
      state.events = payload;
    },
    addEvent: (state, { payload }) => {
      const newArray = [...state.events, ...payload];
      state.events = newArray;
      state.nextEvent = findNextEvent(newArray);
    },
    editEventById: (state, { payload }) => {
      const newArray = state.events.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.events = newArray;
      state.nextEvent = findNextEvent(newArray);
    },
  },
});

export const {
  setEventViewSelected,
  setNextEvent,
  setEvents,
  addEvent,
  editEventById,
  setEventStatus,
  resetEventsVariables,
} = eventsSlice.actions;
