import { createSlice } from '@reduxjs/toolkit';
import { eventsStatus } from '../../shared';

export const levelsSlice = createSlice({
  name: 'levels',
  initialState: {
    levels: [],
    levelsStatus: {
      level: eventsStatus.initial,
      levels: eventsStatus.initial,
    }
  },
  reducers: {
    setLevelsStatus: (state,{payload})=>{
      const {level, levels}=payload;
      if(level) state.levelsStatus.level=level;
      if(levels) state.levelsStatus.levels=levels;
    },

    
    setLevels: (state, { payload }) => {
      state.levels = payload;
    },
    addLevel: (state, { payload }) => {
      const newArray= [...state.levels, ...payload];
      state.levels = newArray;
    }, 
    editLevelById: (state, { payload }) => {
      const newArray= state.levels.map((data)=>{
        if(data.id==payload[0].id) return payload[0]
        return data;
      });
      state.levels = newArray;
    }, 
  },
});

export const { setLevelsStatus, setLevels, addLevel, editLevelById } = levelsSlice.actions;
