import { configureStore } from "@reduxjs/toolkit";
import otherSlice from "./otherSlice";

export const store = configureStore({
  reducer: {
    other: otherSlice,
  },
});
