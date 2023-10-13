import { createSlice } from "@reduxjs/toolkit";
import userApi from "../services/userApi";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
  },
  reducers: {
    addNotifications: (state, { payload }) => {},
    resetNotification: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    //save user after sign up
    builder.addMatcher(
      userApi.endpoints.signupUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      }
    );
    //save user after login
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
      }
    );
    //logout:destroy user session
    builder.addMatcher(userApi.endpoints.logOutUser.matchFulfilled, () => null);
  },
});

export const { addNotifications, resetNotification } = userSlice.actions;
export default userSlice.reducer;
