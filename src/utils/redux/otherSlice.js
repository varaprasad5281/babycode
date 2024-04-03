import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showListeningModal: false,
  listeningModalContent: "",
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetOtherState: (state) => {
      state = initialState;
    },
  },
});

export const {
  changeLoginModalStatus,
  setLoading,
  changeListeningModalStatus,
  setListeningModalContent,
  resetOtherState,
} = otherSlice.actions;
export default otherSlice.reducer;
