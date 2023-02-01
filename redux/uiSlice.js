import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currancy: '₹',
    // successColor: "green",
  },
  reducers: {
    fetchUITheme: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchUITheme } = uiSlice.actions;

export default uiSlice.reducer;
