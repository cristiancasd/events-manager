import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const attendeesSlice = createSlice({
  name: 'attendees',
  initialState: {
    attendees: [],
    attendee: undefined,

    attendeesStatus: {
      attendee: variableStatus.initial,
      attendees: variableStatus.initial,
    },
  },
  reducers: {
    resetAttendeesVariables: (state) => {
      (state.attendees = []),
        (state.attendeesStatus = {
          attendee: variableStatus.initial,
          attendees: variableStatus.initial,
        });
    },

    setAttendeesStatus: (state, { payload }) => {
      const { attendee, attendees } = payload;
      if (attendee) state.attendeesStatus.attendee = attendee;
      if (attendees) state.attendeesStatus.attendees = attendees;
    },

    setAttendee: (state, { payload }) => {
      state.attendee = payload;
    },

    setAttendees: (state, { payload }) => {
      state.attendees = payload;
    },
  },
});

export const { resetAttendeesVariables, setAttendeesStatus, setAttendees, setAttendee } = attendeesSlice.actions;
