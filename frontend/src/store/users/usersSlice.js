import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: undefined,
    usersStatus: {
      user: variableStatus.initial,
      users: variableStatus.initial,
    },
  },
  reducers: {
    resetUsersVariables: (state) => {
      (state.users = []),
        (state.user = undefined),
        (state.usersStatus = {
          user: variableStatus.initial,
          users: variableStatus.initial,
        });
    },

    setUsersStatus: (state, { payload }) => {
      const { user, users } = payload;
      if (user) state.usersStatus.user = user;
      if (users) state.usersStatus.users = users;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },

    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    addUser: (state, { payload }) => {
      const newArray = [...state.users, payload];
      state.users = newArray;
    },
    editUserById: (state, { payload }) => {
      const newArray = state.users.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.users = newArray;
    },
  },
});

export const { resetUsersVariables, setUsersStatus, setUsers, addUser, editUserById, setUser } = usersSlice.actions;
