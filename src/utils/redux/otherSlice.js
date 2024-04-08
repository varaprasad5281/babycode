import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showListeningModal: false,
  listeningVideoDetails: {},
  isLoading: false,
  vocabularyOffcanvasContent: {},
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
    setListeningVideoDetails: (state, action) => {
      state.listeningVideoDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVocabularyOffcanvasContent: (state, action) => {
      state.vocabularyOffcanvasContent = action.payload;
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
  resetOtherState,
  setListeningVideoDetails,
  setVocabularyOffcanvasContent,
} = otherSlice.actions;
export default otherSlice.reducer;
