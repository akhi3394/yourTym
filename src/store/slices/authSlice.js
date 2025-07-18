import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  userId: null,
  completeProfile: false,
  mobile: null,
  selectedAddress: null, // New state for selected address
  cityName: null,

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.phone;
      state.token = action.payload.token || state.token;
      state.userId = action.payload.userId;
      state.completeProfile = action.payload.completeProfile || false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.userId = null;
      state.completeProfile = false;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    setSelectedAddress: (state, action) => { // New reducer to set selected address
      state.selectedAddress = action.payload;
    },
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
  },
});

export const { login, logout, setUserId, setToken, setMobile, setSelectedAddress ,setCityName} = authSlice.actions;
export default authSlice.reducer;