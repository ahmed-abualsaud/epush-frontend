import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.user = action.payload
    },
    signout: (state, action) => {
      state.user = null
    },
    updateAuthUser: (state, action) => {
      state.user.user = {...state.user.user, ...action.payload}
    },
  },
});

export const { signin, signout, updateAuthUser } = authSlice.actions;

export default authSlice.reducer;