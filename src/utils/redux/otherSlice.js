import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showListeningModal: false,
  listeningModalContent: "",
  userLoggedIn: !!localStorage.getItem("userData"),
  isLoading: false,
};

const otherSlice = createSlice({
  name: "other",
  initialState,
  reducers: {
    changeLoginModalStatus: (state, action) => {
      state.showLoginModal = action.payload;
    },
    changeListeningModalStatus: (state, action) => {
      state.showListeningModal = action.payload;
    },
    setListeningModalContent: (state, action) => {
      state.listeningModalContent = action.payload;
    },
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetState: (state) => {
      state = initialState;
    },
  },
});

export const {
  changeLoginModalStatus,
  setUserLoggedIn,
  setLoading,
  changeListeningModalStatus,
  setListeningModalContent,
  resetState
} = otherSlice.actions;
export default otherSlice.reducer;
