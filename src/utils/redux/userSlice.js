import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoggedIn: !!localStorage.getItem("userData"),
  userDetails: localStorage.getItem("userData"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    resetUserState: (state) => {
      state = initialState;
    },
  },
});

export const {
  setUserLoggedIn,
  setUserDetails,
  resetUserState,
} = userSlice.actions;
export default userSlice.reducer;
