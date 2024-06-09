import { createSlice } from '@reduxjs/toolkit';
import { variableStatus } from '../../shared';

export const prospectsSlice = createSlice({
  name: 'prospects',
  initialState: {
    prospects: [],
    prospect: undefined,
    prospectsStatus: {
      prospect: variableStatus.initial,
      prospects: variableStatus.initial,
    },
  },
  reducers: {
    resetProspectsVariables: (state) => {
      (state.prospects = []),
        (state.prospect = undefined),
        (state.prospectsStatus = {
          prospect: variableStatus.initial,
          prospects: variableStatus.initial,
        });
    },

    setProspectsStatus: (state, { payload }) => {
      const { prospect, prospects } = payload;
      if (prospect) state.prospectsStatus.prospect = prospect;
      if (prospects) state.prospectsStatus.prospects = prospects;
    },

    setProspect: (state, { payload }) => {
      state.prospect = payload;
    },

    deleteProspect: (state, { payload }) => {
      state.prospect = undefined;
      const newArray = [];
      state.prospects.map((prospect) => {
        if (prospect.id != payload) newArray.push(prospect);
      });
      state.prospects = newArray;
    },

    setProspects: (state, { payload }) => {
      state.prospects = payload;
    },
    addProspect: (state, { payload }) => {
      const newArray = [...state.prospects, payload];
      state.prospects = newArray;
    },
    editProspectById: (state, { payload }) => {
      const newArray = state.prospects.map((data) => {
        if (data.id == payload.id) return payload;
        return data;
      });
      state.prospects = newArray;
    },
  },
});

export const {
  resetProspectsVariables,
  setProspectsStatus,
  setProspects,
  addProspect,
  editProspectById,
  setProspect,
  deleteProspect,
} = prospectsSlice.actions;
