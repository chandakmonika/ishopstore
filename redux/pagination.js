import { createSlice } from '@reduxjs/toolkit';
export const pagination = createSlice({
  name: 'pagination',
  initialState: {
    initial: 0,
    pages: [],
    active: 1,
  },
  reducers: {
    pagesTopaginate: (state, action) => {
      const data = action.payload;
      state.pages = data;
    },
    activePage: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { pagesTopaginate, activePage } = pagination.actions;

export default pagination.reducer;
