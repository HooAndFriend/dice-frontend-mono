// ** Redux Imports

import { RootState } from "../../";
import { createSlice } from "@reduxjs/toolkit";

export interface UserTypeProps {
  user: {
    token: { accessToken: string; refreshToken: string };
    user: { nickname: string; profile: string; email: string };
  };
}

const initialState: UserTypeProps = {
  user: {
    token: {
      accessToken: "",
      refreshToken: "",
    },
    user: {
      nickname: "",
      profile: "",
      email: "",
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = { ...initialState.user };
    },
    updateToken: (state, { payload }) => {
      state.user.token.accessToken = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default authSlice.reducer;

export const getAccessToken = (state: RootState) =>
  state.auth.user.token.accessToken;

export const getUserInfo = (state: RootState) => state.auth.user.user;

export const { logout, updateToken } = authSlice.actions;
