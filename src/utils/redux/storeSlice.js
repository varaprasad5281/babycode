import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  userLoggedIn: !!localStorage.getItem("userData"),
  isLoading: false,
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeLoginModalStatus, setUserLoggedIn, setLoading } =
  storeSlice.actions;
export default storeSlice.reducer;
