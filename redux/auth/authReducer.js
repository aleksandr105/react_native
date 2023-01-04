import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  stateChange: false,
  refresh: false,
  userPhoto: null,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userPhoto: payload.userPhoto,
      stateChange: true,
      email: payload.email,
    }),
    updateUserPhoto: (state, { payload }) => ({
      ...state,
      userPhoto: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSingOut: () => initialState,
    refreshing: (state, { payload }) => ({
      ...state,
      refresh: payload.loading,
    }),
  },
});
