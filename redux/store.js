import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import productSlice from './productSlice';
import uiSlice from './uiSlice';
import cartSlice from './cartSlice';
import commonDataSlice from './commonDataSlice';
import addressSlice from './addressSlice';
import pagination from './pagination';

export default configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    products: productSlice,
    cart: cartSlice,
    navigationBar: commonDataSlice,
    address: addressSlice,
    pagination: pagination,
  },
});
