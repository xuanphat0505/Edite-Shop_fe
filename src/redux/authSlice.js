import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = false;
    },
    registerFail: (state) => {
      state.error = true;
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    logoutStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.error = false;
    },
    logoutFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    updateSubscriptionStatus: (state, payload) => {
      if (state.user) {
        state.user.subscribe = payload;
      }
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFail,
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  updateSubscriptionStatus,
} = authSlice.actions;

export default authSlice.reducer;
