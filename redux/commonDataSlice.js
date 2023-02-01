import { createSlice } from '@reduxjs/toolkit';

// TODO: remove this once apis are connected

export const commonDataSlice = createSlice({
  name: 'navigationBar',
  initialState: {
    navMenu: [], //New Arrival Page Connect
  },
  reducers: {
    HeaderandFooterNav: (state, action) => {
      const data = action.payload;
      state.navMenu = data;
    },
  },
});

export const { HeaderandFooterNav } = commonDataSlice.actions;

export default commonDataSlice.reducer;
