import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: {
    AddressId: null,
    Addresses: [],
    delivery: 'State Bank Nagar B Wing Flat Number',
    CountryId: '',
    StateId: '',
  },
  reducers: {
    addressDetails: (state, action) => {
      const data = action.payload;
      state.delivery = data;
    },

    AddressId: (state, action) => {
      const data = action.payload;
      state.AddressId = data;
    },
    AddressDelect: (state, action) => {
      const data = action.payload;

      const item = state.Addresses.find(p => p.address_id === data);

      if (!item) return;
      state.Addresses = state.Addresses.filter(
        item => item.address_id !== data,
      );
    },
    Addresses: (state, action) => {
      const data = action.payload;
      state.Addresses = data;
    },
    CountryId: (state, action) => {
      const data = action.payload;
      state.CountryId = data;
    },
    StateId: (state, action) => {
      const data = action.payload;
      state.StateId = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addressDetails,
  AddressId,
  Addresses,
  AddressDelect,
  CountryId,
  StateId,
} = addressSlice.actions;

export default addressSlice.reducer;
