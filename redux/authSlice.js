import { createSlice } from '@reduxjs/toolkit';
import { config } from '../config';
import { isServer } from '../utils';

const localUser = !isServer()
  ? localStorage.getItem(config.localStorageAuthKey)
  : null;

const initialState = {
  isAuthenticated: localUser ? true : false,
  isAuthenticating: false,
  user: localUser ? JSON.parse(localUser) : null,
  addresses: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticating: state => {
      state.isAuthenticating = true;
    },
    loginSuccess: (state, action) => {
      const data = action.payload;
      if (!data) return;

      // save user data in localstorage
      localStorage.setItem(config.localStorageAuthKey, JSON.stringify(data));

      state.user = data;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
    loginFail: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.isAuthenticating = false;
    },
    loadAddresses: (state, action) => {
      const addresses = action.payload;
      state.addresses = addresses;
    },
    logout: state => {
      localStorage.removeItem(config.localStorageAuthKey);
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.user = false;
    },
    editData: (state, action) => {
      const data = action.payload;
      // save edit user data in localstorage
      localStorage.setItem(config.localStorageAuthKey, JSON.stringify(data));

      state.user = data;
      state.isAuthenticated = true;
      state.isAuthenticating = false;
    },
  },
});

export const {
  authenticating,
  loginFail,
  loginSuccess,
  logout,
  loadAddresses,
  editData,
} = authSlice.actions;

export default authSlice.reducer;
