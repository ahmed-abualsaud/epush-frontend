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
    }
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;