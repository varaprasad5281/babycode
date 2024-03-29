import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  userLoggedIn: !!localStorage.getItem("userData"),
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    changeLoginModalStatus: (state, action) => {
      state.showLoginModal = action.payload;
    },
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
  },
});

export const { changeLoginModalStatus, setUserLoggedIn } = storeSlice.actions;
export default storeSlice.reducer;
