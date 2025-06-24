import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  userId: null,
  completeProfile: false,
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
  },
});

export const { login, logout, setUserId, setToken } = authSlice.actions;
export default authSlice.reducer;