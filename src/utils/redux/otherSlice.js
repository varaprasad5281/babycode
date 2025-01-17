import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  showListeningModal: false,
  showListeningTestRetakeAlert: false,
  listeningVideoDetails: {},
  readingData: [],
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
    changeShowListeningTestRetakeAlertStatus: (state, action) => {
      state.showListeningTestRetakeAlert = action.payload;
    },
    setListeningVideoDetails: (state, action) => {
      state.listeningVideoDetails = action.payload;
    },
    setReadingData: (state, action) => {
      state.readingData = action.payload;
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
  setReadingData,
  setVocabularyOffcanvasContent,
  changeShowListeningTestRetakeAlertStatus,
} = otherSlice.actions;
export default otherSlice.reducer;
